import json
import os
import psycopg2
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Управляет сообщениями форума - отправка, получение списка, ответы
    Args: event с httpMethod, body, queryStringParameters
    Returns: HTTP response с результатом
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'GET':
        return get_messages(event)
    elif method == 'POST':
        return submit_message(event)
    elif method == 'PUT':
        return reply_to_message(event)
    else:
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

def get_messages(event: Dict[str, Any]) -> Dict[str, Any]:
    params = event.get('queryStringParameters') or {}
    status_filter = params.get('status')
    
    db_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    
    if status_filter:
        cur.execute(
            "SELECT id, nickname, message, created_at, status, admin_reply, replied_at, email_sent "
            "FROM t_p55599668_fdm_minecraft_websit.forum_messages "
            "WHERE status = %s ORDER BY created_at DESC",
            (status_filter,)
        )
    else:
        cur.execute(
            "SELECT id, nickname, message, created_at, status, admin_reply, replied_at, email_sent "
            "FROM t_p55599668_fdm_minecraft_websit.forum_messages "
            "ORDER BY created_at DESC"
        )
    
    rows = cur.fetchall()
    messages = []
    
    for row in rows:
        messages.append({
            'id': row[0],
            'nickname': row[1],
            'message': row[2],
            'created_at': row[3].isoformat() if row[3] else None,
            'status': row[4],
            'admin_reply': row[5],
            'replied_at': row[6].isoformat() if row[6] else None,
            'email_sent': row[7]
        })
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'messages': messages})
    }

def reply_to_message(event: Dict[str, Any]) -> Dict[str, Any]:
    body_data = json.loads(event.get('body', '{}'))
    message_id = body_data.get('message_id')
    admin_reply = body_data.get('admin_reply', '').strip()
    
    if not message_id or not admin_reply:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'message_id and admin_reply are required'})
        }
    
    db_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    
    cur.execute(
        "UPDATE t_p55599668_fdm_minecraft_websit.forum_messages "
        "SET admin_reply = %s, replied_at = CURRENT_TIMESTAMP, status = 'answered' "
        "WHERE id = %s",
        (admin_reply, message_id)
    )
    
    if cur.rowcount == 0:
        conn.close()
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Message not found'})
        }
    
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'success': True})
    }

def submit_message(event: Dict[str, Any]) -> Dict[str, Any]:
    body_data = json.loads(event.get('body', '{}'))
    nickname = body_data.get('nickname', '').strip()
    message = body_data.get('message', '').strip()
    
    if not nickname or not message:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Nickname and message are required'})
        }
    
    db_url = os.environ.get('DATABASE_URL')
    gmail_password = os.environ.get('GMAIL_APP_PASSWORD')
    
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    
    cur.execute(
        "INSERT INTO t_p55599668_fdm_minecraft_websit.forum_messages (nickname, message, status) "
        "VALUES (%s, %s, 'new') RETURNING id",
        (nickname, message)
    )
    message_id = cur.fetchone()[0]
    conn.commit()
    
    if gmail_password:
        try:
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'🎮 Новое сообщение на форуме от {nickname}'
            msg['From'] = 'noreply@fdm.su'
            msg['To'] = 'boltycevsasa6@gmail.com'
            
            html_body = f"""
            <html>
            <body style="font-family: Arial, sans-serif; background-color: #1a1a1a; color: #fff; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); border: 3px solid #4ade80; border-radius: 10px; padding: 30px;">
                    <h1 style="color: #4ade80; text-align: center; margin-bottom: 30px;">📜 Новое сообщение на форуме</h1>
                    
                    <div style="background: rgba(74, 222, 128, 0.1); border-left: 4px solid #4ade80; padding: 15px; margin: 20px 0;">
                        <p style="margin: 5px 0;"><strong>👤 Никнейм:</strong> {nickname}</p>
                        <p style="margin: 5px 0;"><strong>🆔 ID сообщения:</strong> #{message_id}</p>
                    </div>
                    
                    <div style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 20px; margin: 20px 0;">
                        <h3 style="color: #4ade80; margin-top: 0;">💬 Сообщение:</h3>
                        <p style="line-height: 1.6; white-space: pre-wrap;">{message}</p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="https://{event.get('headers', {}).get('host', 'your-domain.com')}/forum-admin" 
                           style="background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); color: #000; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                            ✉️ Ответить на сообщение
                        </a>
                    </div>
                    
                    <p style="text-align: center; color: #888; font-size: 12px; margin-top: 30px;">
                        FDM.SU - Лучший гриферский сервер Minecraft
                    </p>
                </div>
            </body>
            </html>
            """
            
            msg.attach(MIMEText(html_body, 'html'))
            
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                smtp.login('boltycevsasa6@gmail.com', gmail_password)
                smtp.send_message(msg)
            
            cur.execute(
                "UPDATE t_p55599668_fdm_minecraft_websit.forum_messages SET email_sent = TRUE WHERE id = %s",
                (message_id,)
            )
            conn.commit()
        except Exception as e:
            print(f"Email error: {e}")
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'success': True, 'message_id': message_id})
    }
