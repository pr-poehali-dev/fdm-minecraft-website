import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: AI-помощник для ответов на вопросы о Minecraft с логикой мышления
    Args: event - dict с httpMethod, body, queryStringParameters
          context - object с request_id, function_name
    Returns: HTTP response dict с ответом от AI
    '''
    method: str = event.get('httpMethod', 'GET')
    
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
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        import openai
        
        body_data = json.loads(event.get('body', '{}'))
        question = body_data.get('question', '').strip()
        
        if not question:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Вопрос не может быть пустым'})
            }
        
        api_key = os.environ.get('OPENAI_API_KEY')
        if not api_key:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'OpenAI API key не настроен'})
            }
        
        client = openai.OpenAI(api_key=api_key)
        
        system_prompt = """Ты - эксперт по Minecraft с глубокими знаниями игры. 
Твоя задача - отвечать на вопросы игроков, используя логическое мышление и детальные объяснения.

Контекст сервера Freedom:
- Гриферский сервер на версии 1.20.1
- Поддержка версий 1.7 - 1.21.7
- Есть голосовой чат (Simple Voice Chat)
- Поддержка кастомных анимаций (Emotecrafts)
- Кастомные предметы и механики
- Нелегальные предметы разрешены
- IP: go.fdm.su

При ответе:
1. Анализируй вопрос логически
2. Давай пошаговые объяснения
3. Учитывай контекст сервера Freedom
4. Будь дружелюбным и понятным
5. Если вопрос о сервере - используй информацию выше
6. Отвечай на русском языке"""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": question}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        
        answer = response.choices[0].message.content
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'question': question,
                'answer': answer,
                'model': 'gpt-4o-mini'
            }, ensure_ascii=False)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка: {str(e)}'})
        }
