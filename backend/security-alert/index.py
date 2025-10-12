'''
Business: Monitor login attempts and send email alerts on suspicious activity
Args: event with httpMethod (called by cron or manually)
Returns: JSON response with alert status
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime, timedelta
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

DATABASE_URL = os.environ.get('DATABASE_URL')
ALERT_EMAIL = os.environ.get('ALERT_EMAIL')
SMTP_HOST = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', '587'))
SMTP_USER = os.environ.get('SMTP_USER')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD')

FAILED_THRESHOLD = 3
TIME_WINDOW_MINUTES = 1

def send_alert_email(ip_address: str, failed_count: int, username: str):
    if not all([ALERT_EMAIL, SMTP_USER, SMTP_PASSWORD]):
        return False
    
    subject = f"⚠️ Подозрительная активность на сайте"
    
    body = f"""
    <html>
    <body style="font-family: Arial, sans-serif;">
        <h2 style="color: #dc2626;">Обнаружена подозрительная активность</h2>
        <p>Зафиксировано несколько неудачных попыток входа в админ-панель:</p>
        <ul>
            <li><strong>IP адрес:</strong> {ip_address}</li>
            <li><strong>Логин:</strong> {username or 'не указан'}</li>
            <li><strong>Количество попыток:</strong> {failed_count} за {TIME_WINDOW_MINUTES} минуту</li>
            <li><strong>Время:</strong> {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')} UTC</li>
        </ul>
        <p style="color: #f59e0b;">Рекомендуем проверить логи безопасности в админ-панели.</p>
        <hr>
        <p style="font-size: 12px; color: #666;">Это автоматическое уведомление системы безопасности</p>
    </body>
    </html>
    """
    
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = SMTP_USER
        msg['To'] = ALERT_EMAIL
        
        html_part = MIMEText(body, 'html', 'utf-8')
        msg.attach(html_part)
        
        server = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
        
        return True
    except Exception as e:
        print(f"Failed to send email: {str(e)}")
        return False

def check_suspicious_activity(conn):
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    time_threshold = datetime.utcnow() - timedelta(minutes=TIME_WINDOW_MINUTES)
    
    cur.execute('''
        SELECT ip_address, username, COUNT(*) as failed_count
        FROM login_attempts
        WHERE success = FALSE 
        AND attempt_time > %s
        GROUP BY ip_address, username
        HAVING COUNT(*) >= %s
    ''', (time_threshold, FAILED_THRESHOLD))
    
    suspicious = cur.fetchall()
    cur.close()
    
    return suspicious

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method in ['GET', 'POST']:
        conn = psycopg2.connect(DATABASE_URL)
        suspicious = check_suspicious_activity(conn)
        conn.close()
        
        alerts_sent = 0
        
        for item in suspicious:
            if send_alert_email(item['ip_address'], item['failed_count'], item['username']):
                alerts_sent += 1
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({
                'suspicious_ips': len(suspicious),
                'alerts_sent': alerts_sent,
                'message': f'Checked security. Found {len(suspicious)} suspicious IPs, sent {alerts_sent} alerts'
            })
        }
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'error': 'Method not allowed'})
    }
