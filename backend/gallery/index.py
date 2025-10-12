import json
import os
from typing import Dict, Any, Optional
import psycopg2
from psycopg2.extras import RealDictCursor
import jwt

def verify_token(headers: Dict[str, str]) -> Optional[Dict[str, Any]]:
    token = headers.get('x-auth-token') or headers.get('X-Auth-Token')
    if not token:
        return None
    
    try:
        jwt_secret = os.environ.get('JWT_SECRET', 'default-secret-change-in-production')
        payload = jwt.decode(token, jwt_secret, algorithms=['HS256'])
        return payload
    except:
        return None

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage gallery photos - get all photos, add new photo, delete photo
    Args: event with httpMethod, body, queryStringParameters
    Returns: JSON response with photos data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database configuration missing'})
        }
    
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            cursor.execute('SELECT id, title, description, image_url, created_at FROM gallery_photos ORDER BY created_at DESC')
            photos = cursor.fetchall()
            
            result = []
            for photo in photos:
                result.append({
                    'id': photo['id'],
                    'title': photo['title'],
                    'description': photo['description'],
                    'image_url': photo['image_url'],
                    'created_at': photo['created_at'].isoformat() if photo['created_at'] else None
                })
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'photos': result})
            }
        
        if method == 'POST':
            user = verify_token(event.get('headers', {}))
            if not user:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Unauthorized'})
                }
            
            body_data = json.loads(event.get('body', '{}'))
            title = body_data.get('title', '')
            description = body_data.get('description', '')
            image_url = body_data.get('image_url', '')
            
            if not title or not image_url:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Title and image_url are required'})
                }
            
            cursor.execute(
                'INSERT INTO gallery_photos (title, description, image_url) VALUES (%s, %s, %s) RETURNING id, title, description, image_url, created_at',
                (title, description, image_url)
            )
            conn.commit()
            new_photo = cursor.fetchone()
            
            result = {
                'id': new_photo['id'],
                'title': new_photo['title'],
                'description': new_photo['description'],
                'image_url': new_photo['image_url'],
                'created_at': new_photo['created_at'].isoformat() if new_photo['created_at'] else None
            }
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'photo': result})
            }
        
        if method == 'DELETE':
            user = verify_token(event.get('headers', {}))
            if not user:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Unauthorized'})
                }
            
            params = event.get('queryStringParameters', {})
            photo_id = params.get('id')
            
            if not photo_id:
                cursor.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Photo id is required'})
                }
            
            cursor.execute('DELETE FROM gallery_photos WHERE id = %s', (photo_id,))
            conn.commit()
            
            cursor.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True})
            }
        
        cursor.close()
        conn.close()
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }