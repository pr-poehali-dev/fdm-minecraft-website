'''
Business: Fetch Minecraft server online status from MinecraftRating
Args: event with httpMethod GET, context with request_id
Returns: JSON with online players count and max players
'''

import json
import re
from urllib.request import urlopen, Request
from typing import Dict, Any


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        req = Request(
            'https://minecraftrating.ru/server/fdm/',
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        
        with urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8')
        
        online_match = re.search(r'<span[^>]*class="[^"]*online[^"]*"[^>]*>(\d+)</span>', html, re.IGNORECASE)
        max_match = re.search(r'<span[^>]*class="[^"]*max[^"]*"[^>]*>(\d+)</span>', html, re.IGNORECASE)
        
        if not online_match:
            online_match = re.search(r'Онлайн:\s*(\d+)', html)
        if not max_match:
            max_match = re.search(r'/\s*(\d+)', html)
        
        online = int(online_match.group(1)) if online_match else 0
        max_players = int(max_match.group(1)) if max_match else 128
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'online': online,
                'max': max_players,
                'timestamp': context.request_id
            })
        }
    
    except Exception as e:
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'online': 0,
                'max': 128,
                'error': str(e)
            })
        }
