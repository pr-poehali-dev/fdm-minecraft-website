'''
Business: Get login attempts history for security monitoring
Args: event with httpMethod, headers (X-Auth-Token)
Returns: JSON response with login history
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
import jwt

DATABASE_URL = os.environ.get('DATABASE_URL')
JWT_SECRET = os.environ.get('JWT_SECRET', 'default-secret-change-in-production')

def verify_token(headers: Dict[str, str]) -> bool:
    token = headers.get('x-auth-token') or headers.get('X-Auth-Token')
    if not token:
        return False
    
    try:
        jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        return True
    except:
        return False

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if not verify_token(event.get('headers', {})):
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Unauthorized'})
        }
    
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    if method == 'GET':
        params = event.get('queryStringParameters', {})
        limit = int(params.get('limit', 100))
        
        cursor.execute(
            'SELECT id, ip_address, username, attempt_time, success FROM login_attempts ORDER BY attempt_time DESC LIMIT %s',
            (limit,)
        )
        attempts = cursor.fetchall()
        
        result = []
        for attempt in attempts:
            result.append({
                'id': attempt['id'],
                'ip_address': attempt['ip_address'],
                'username': attempt['username'],
                'attempt_time': attempt['attempt_time'].isoformat() if attempt['attempt_time'] else None,
                'success': attempt['success']
            })
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'attempts': result, 'total': len(result)})
        }
    
    if method == 'DELETE':
        cursor.execute('DELETE FROM login_attempts WHERE attempt_time < NOW() - INTERVAL \'30 days\'')
        deleted = cursor.rowcount
        conn.commit()
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'deleted': deleted, 'message': 'Old attempts cleared'})
        }
    
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }
