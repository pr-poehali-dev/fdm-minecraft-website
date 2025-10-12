/**
 * Business: Get Minecraft server status using mine-status library
 * Args: event with httpMethod GET, context with requestId
 * Returns: JSON with server status (online, max, version, motd, players list)
 */

import { MineStatus } from 'mine-status';

interface CloudFunctionEvent {
    httpMethod: string;
    headers: Record<string, string>;
    queryStringParameters?: Record<string, string>;
    body?: string;
    isBase64Encoded: boolean;
}

interface CloudFunctionContext {
    requestId: string;
    functionName: string;
    functionVersion: string;
    memoryLimitInMB: number;
}

export const handler = async (event: CloudFunctionEvent, context: CloudFunctionContext): Promise<any> => {
    const { httpMethod } = event;
    
    if (httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            body: ''
        };
    }
    
    if (httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
    
    try {
        const minestatus = new MineStatus();
        
        const response = await new Promise((resolve, reject) => {
            minestatus.getJavaServerStatus('go.fdm.su', (statusResponse: any) => {
                if (statusResponse.error) {
                    reject(statusResponse.error);
                } else {
                    resolve(statusResponse);
                }
            });
        });
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            isBase64Encoded: false,
            body: JSON.stringify(response)
        };
    } catch (error: any) {
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            isBase64Encoded: false,
            body: JSON.stringify({
                online: 0,
                max: 128,
                error: error.message || 'Failed to fetch server status'
            })
        };
    }
};
