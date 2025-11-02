import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage video facts with title, author, and video URL
    Args: event - dict with httpMethod, body, queryStringParameters
          context - object with request_id, function_name
    Returns: HTTP response dict
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
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        if method == 'GET':
            cur.execute('SELECT id, title, author, video_url, created_at FROM t_p55599668_fdm_minecraft_websit.video_facts ORDER BY created_at DESC')
            videos = cur.fetchall()
            
            videos_list = []
            for video in videos:
                videos_list.append({
                    'id': video['id'],
                    'title': video['title'],
                    'author': video['author'],
                    'video_url': video['video_url'],
                    'created_at': video['created_at'].isoformat() if video['created_at'] else None
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'videos': videos_list})
            }
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            title = body_data.get('title', '')
            author = body_data.get('author', '')
            video_url = body_data.get('video_url', '')
            
            if not title or not author or not video_url:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Title, author and video_url are required'})
                }
            
            cur.execute(
                "INSERT INTO t_p55599668_fdm_minecraft_websit.video_facts (title, author, video_url) VALUES (%s, %s, %s) RETURNING id",
                (title, author, video_url)
            )
            video_id = cur.fetchone()['id']
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'id': video_id, 'message': 'Video added successfully'})
            }
        
        if method == 'DELETE':
            params = event.get('queryStringParameters', {})
            video_id = params.get('id')
            
            if not video_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Video ID is required'})
                }
            
            cur.execute(
                'DELETE FROM t_p55599668_fdm_minecraft_websit.video_facts WHERE id = %s',
                (video_id,)
            )
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'message': 'Video deleted successfully'})
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    finally:
        cur.close()
        conn.close()
