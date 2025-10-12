'''
Business: Authenticate users via Telegram and generate JWT tokens
Args: event - dict with httpMethod, queryStringParameters (hash, id, username, etc.)
      context - object with attributes: request_id
Returns: HTTP response with JWT token or redirect
'''

import json
import os
import jwt
import hashlib
import hmac
from datetime import datetime, timedelta
from typing import Dict, Any
import psycopg2

DATABASE_URL = os.environ.get('DATABASE_URL')
JWT_SECRET = os.environ.get('JWT_SECRET', 'default-secret-change-in-production')
TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN')

def verify_telegram_auth(auth_data: Dict[str, str]) -> bool:
    if not TELEGRAM_BOT_TOKEN:
        return False
    
    check_hash = auth_data.get('hash')
    if not check_hash:
        return False
    
    data_check_arr = []
    for key in sorted(auth_data.keys()):
        if key != 'hash':
            data_check_arr.append(f'{key}={auth_data[key]}')
    
    data_check_string = '\n'.join(data_check_arr)
    
    secret_key = hashlib.sha256(TELEGRAM_BOT_TOKEN.encode()).digest()
    calculated_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()
    
    return calculated_hash == check_hash

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'GET':
        params = event.get('queryStringParameters', {})
        
        if not params or 'id' not in params:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Invalid Telegram data'})
            }
        
        if not verify_telegram_auth(params):
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Invalid Telegram authentication'})
            }
        
        telegram_id = params.get('id')
        username = params.get('username', '')
        first_name = params.get('first_name', '')
        last_name = params.get('last_name', '')
        photo_url = params.get('photo_url', '')
        
        full_name = f"{first_name} {last_name}".strip()
        
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        
        cur.execute(
            "SELECT id, username, role, is_active FROM t_p55599668_fdm_minecraft_websit.admin_users WHERE username = %s",
            (f'tg_{telegram_id}',)
        )
        user = cur.fetchone()
        
        if not user:
            cur.execute(
                "INSERT INTO t_p55599668_fdm_minecraft_websit.admin_users (username, password_hash, email, full_name, role, is_active) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
                (f'tg_{telegram_id}', '', f'telegram_{telegram_id}@telegram.local', full_name or username, 'admin', True)
            )
            user_id = cur.fetchone()[0]
            user_username = f'tg_{telegram_id}'
            user_role = 'admin'
            is_active = True
            conn.commit()
        else:
            user_id, user_username, user_role, is_active = user
        
        if not is_active:
            cur.close()
            conn.close()
            return {
                'statusCode': 403,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Account is disabled'})
            }
        
        cur.execute(
            "UPDATE t_p55599668_fdm_minecraft_websit.admin_users SET last_login = %s WHERE id = %s",
            (datetime.utcnow(), user_id)
        )
        conn.commit()
        
        cur.execute(
            "INSERT INTO t_p55599668_fdm_minecraft_websit.login_attempts (ip_address, username, success, user_agent) VALUES (%s, %s, %s, %s)",
            ('telegram', user_username, True, 'Telegram OAuth')
        )
        conn.commit()
        
        cur.close()
        conn.close()
        
        token = jwt.encode(
            {
                'user_id': user_id,
                'username': user_username,
                'telegram_id': telegram_id,
                'role': user_role,
                'exp': datetime.utcnow() + timedelta(days=30)
            },
            JWT_SECRET,
            algorithm='HS256'
        )
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'token': token,
                'username': username or user_username,
                'full_name': full_name,
                'role': user_role,
                'telegram_id': telegram_id
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }
