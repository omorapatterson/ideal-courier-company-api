import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorCode } from './error-codes';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        let code = exception.message.code;
        let description = exception.message.description;
        if (!exception.message.code) {
            if (status === 401) {
                code = ErrorCode.Unauthorized;
                description = 'Token invalid or expired';
            } else if (status === 400) {
                code = ErrorCode.InvalidPayload;
                description = exception.message.message;
            } else {
                code = ErrorCode.UnknownError;
                description = 'Unexpected error';
            }
        }
        response
            .status(status)
            .json({
                code,
                timestamp: new Date().toISOString(),
                description,
            });
    }
}