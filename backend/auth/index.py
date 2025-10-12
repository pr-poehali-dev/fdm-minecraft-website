'''
Business: Authenticate admin users with rate limiting and generate JWT tokens
Args: event - dict with httpMethod, body (username, password), requestContext with identity
      context - object with attributes: request_id
Returns: HTTP response with JWT token or error
'''

import json
import os
import jwt
import bcrypt
from datetime import datetime, timedelta
from typing import Dict, Any
import psycopg2
import urllib.request

DATABASE_URL = os.environ.get('DATABASE_URL')
JWT_SECRET = os.environ.get('JWT_SECRET', 'default-secret-change-in-production')
SECURITY_ALERT_URL = os.environ.get('SECURITY_ALERT_URL', 'https://functions.poehali.dev/ALERT_FUNCTION_ID')

MAX_ATTEMPTS = 5
LOCKOUT_MINUTES = 15
ALERT_THRESHOLD = 3

def get_client_ip(event: Dict[str, Any]) -> str:
    request_context = event.get('requestContext', {})
    identity = request_context.get('identity', {})
    return identity.get('sourceIp', 'unknown')

def check_rate_limit(conn, ip_address: str) -> tuple[bool, int]:
    cur = conn.cursor()
    
    lockout_time = datetime.utcnow() - timedelta(minutes=LOCKOUT_MINUTES)
    
    cur.execute(
        "SELECT COUNT(*) FROM login_attempts WHERE ip_address = %s AND attempt_time > %s AND success = FALSE",
        (ip_address, lockout_time)
    )
    failed_attempts = cur.fetchone()[0]
    
    cur.close()
    
    remaining = MAX_ATTEMPTS - failed_attempts
    is_locked = failed_attempts >= MAX_ATTEMPTS
    
    return is_locked, remaining

def log_attempt(conn, ip_address: str, username: str, success: bool):
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO login_attempts (ip_address, username, success) VALUES (%s, %s, %s)",
        (ip_address, username, success)
    )
    conn.commit()
    cur.close()

def trigger_security_check(ip_address: str):
    try:
        cur = conn.cursor()
        one_minute_ago = datetime.utcnow() - timedelta(minutes=1)
        cur.execute(
            "SELECT COUNT(*) FROM login_attempts WHERE ip_address = %s AND success = FALSE AND attempt_time > %s",
            (ip_address, one_minute_ago)
        )
        failed_count = cur.fetchone()[0]
        cur.close()
        
        if failed_count >= ALERT_THRESHOLD:
            req = urllib.request.Request(SECURITY_ALERT_URL, method='POST')
            urllib.request.urlopen(req, timeout=5)
    except:
        pass

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        username = body_data.get('username', '')
        password = body_data.get('password', '')
        ip_address = get_client_ip(event)
        
        if not username or not password:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Username and password required'})
            }
        
        conn = psycopg2.connect(DATABASE_URL)
        
        is_locked, remaining = check_rate_limit(conn, ip_address)
        
        if is_locked:
            conn.close()
            return {
                'statusCode': 429,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'error': f'Too many failed attempts. Try again in {LOCKOUT_MINUTES} minutes',
                    'locked': True,
                    'lockout_minutes': LOCKOUT_MINUTES
                })
            }
        
        cur = conn.cursor()
        
        cur.execute(
            "SELECT id, password_hash FROM admin_users WHERE username = %s",
            (username,)
        )
        user = cur.fetchone()
        
        if not user:
            log_attempt(conn, ip_address, username, False)
            trigger_security_check(ip_address)
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'error': 'Invalid credentials',
                    'remaining_attempts': remaining - 1
                })
            }
        
        user_id, password_hash = user
        
        if not bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8')):
            log_attempt(conn, ip_address, username, False)
            trigger_security_check(ip_address)
            cur.close()
            conn.close()
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({
                    'error': 'Invalid credentials',
                    'remaining_attempts': remaining - 1
                })
            }
        
        log_attempt(conn, ip_address, username, True)
        cur.close()
        conn.close()
        
        token = jwt.encode(
            {
                'user_id': user_id,
                'username': username,
                'exp': datetime.utcnow() + timedelta(days=7)
            },
            JWT_SECRET,
            algorithm='HS256'
        )
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'token': token, 'username': username})
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }