import json
import os
from typing import Dict, Any
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Seed gallery with initial photos from Freedom server
    Args: event with httpMethod
    Returns: JSON response with inserted photos count
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Only POST method allowed'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database configuration missing'})
        }
    
    photos = [
        {
            'title': 'Эпоха начал',
            'description': 'Новогодняя ёлка на базе Freedom - начало легендарной истории сервера',
            'image_url': 'https://cdn.poehali.dev/files/a8d42193-5dc1-4a4f-bac5-6b6ae4d20f7b.png'
        },
        {
            'title': 'Красный Рассвет lopalopa',
            'description': 'Легендарный игрок lopalopa на границе территории клана Красный Рассвет',
            'image_url': 'https://cdn.poehali.dev/files/aacba224-a488-460c-9872-34db71386eec.png'
        },
        {
            'title': 'Дом с базы Destroyers',
            'description': 'Эпичный дом с красным ковром на базе клана Destroyers',
            'image_url': 'https://cdn.poehali.dev/files/0ec3153c-7a99-477f-b0e6-2c73536006be.png'
        },
        {
            'title': 'База Восход',
            'description': 'Разрушенная и восстановленная база Восход - символ возрождения клана',
            'image_url': 'https://cdn.poehali.dev/files/0a8aff60-6c3c-48a4-906d-76d3494df479.png'
        },
        {
            'title': 'Одна из баз сервера',
            'description': 'Креативная постройка с гигантским крипером и базой на фоне',
            'image_url': 'https://cdn.poehali.dev/files/15fadf42-4cf7-46c5-8911-cc0425708f3a.png'
        }
    ]
    
    try:
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        inserted_count = 0
        for photo in photos:
            cursor.execute(
                'INSERT INTO gallery_photos (title, description, image_url) VALUES (%s, %s, %s) ON CONFLICT DO NOTHING',
                (photo['title'], photo['description'], photo['image_url'])
            )
            if cursor.rowcount > 0:
                inserted_count += 1
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True,
                'inserted': inserted_count,
                'total': len(photos)
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
