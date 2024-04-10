import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Inject,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { HttpResponse } from 'src/constants/response/responseCode';
import { Logger } from 'winston';

@Catch(HttpException)
export class ErrorHttpFilter implements ExceptionFilter {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) {}

    async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const statusHttp: number = exception.getStatus();
        // const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const exceptionResponse: any = exception.getResponse();
        const errorStack = exception.stack;
        const debugId = 'debugId'; // Add UUID
        const timeStamp = new Date().toISOString();

        // Added error in logger
        this.logger.error('Response error', errorStack);

        //check the exception type and build the response as per that
        if (
            typeof exceptionResponse === 'object' &&
            'statusCode' in exceptionResponse &&
            'message' in exceptionResponse
        ) {
            response.status(statusHttp).json({
                statusCode: statusHttp,
                message: exceptionResponse.message,
                errors: exceptionResponse.errors,
                errorCode: exceptionResponse.errorCode,
                debugId,
                timeStamp,
            });
        } else if (typeof exceptionResponse === 'string') {
            response.status(statusHttp).json({
                statusCode: statusHttp,
                message: exceptionResponse,
                debugId,
                timeStamp,
            });
        } else {
            response.status(statusHttp).json({
                statusCode: statusHttp,
                message: HttpResponse?.[statusHttp] ?? 'Error message',
                errors: exceptionResponse,
                debugId,
                timeStamp,
            });
        }
    }
}
