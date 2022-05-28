import { APIGatewayProxyResult } from 'aws-lambda';
import { StatusCode } from './commons';

class Result {
    private statusCode: number;
    private code: number;
    private message: string;
    private data: any;

    constructor(statusCode: number, code: number, message: string, data?: any) {
        this.statusCode = statusCode;
        this.code = code;
        this.message = message;
        this.data = data;
    }

    bodyToString(): APIGatewayProxyResult {
        return {
            statusCode: this.statusCode,
            body: JSON.stringify({
                code: this.code,
                message: this.message,
                data: this.data
            }),
        };
    }
}

export class MessageUtil {
    static success(data?: any): APIGatewayProxyResult {
        const result = new Result(StatusCode.ok, StatusCode.ok, 'success', data);
        return result.bodyToString();
    }

    static error(code: StatusCode, message: string): APIGatewayProxyResult {
        const result = new Result(code, code, message);
        return result.bodyToString();
    }
}