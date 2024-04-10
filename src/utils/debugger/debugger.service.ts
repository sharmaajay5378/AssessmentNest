import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { LoggerOptions } from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');
// import { DEBUGGER_NAME } from '../debugger.constant';

@Injectable()
export class DebuggerService {
    private readonly DEBUGGER_NAME = 'system';

    private readonly env: string;
    private readonly debug: boolean;
    private readonly logger: boolean;
    private readonly maxSize: string;
    private readonly maxFiles: string;

    constructor(private configService: ConfigService) {
        this.env = this.configService.get('app.env')!;
        this.debug = this.configService.get('app.debug')!;
        this.maxSize = this.configService.get('app.debugger.system.maxSize')!;
        this.maxFiles = this.configService.get('app.debugger.system.maxFiles')!;
    }

    createLogger(): LoggerOptions {
        const transports = [];

        transports.push(this.errorHandler());
        transports.push(this.infoHandler());
        transports.push(this.debugHandler());

        if ((this.debug || this.logger) && this.env !== 'production') {
            transports.push(
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.ms(),
                        nestWinstonModuleUtilities.format.nestLike('App'),
                    ),
                }),
            );
        }

        const loggerOptions: LoggerOptions = {
            format: winston.format.combine(
                winston.format.timestamp({ format: 'MM/DD/YYYY h:m:s A' }),
                winston.format.errors({ stack: true }),
                winston.format.prettyPrint(),
            ),
            transports,
            exitOnError: false,
            rejectionHandlers: [this.rejectionHandler()],
        };

        return loggerOptions;
    }

    errorHandler() {
        return new DailyRotateFile({
            level: 'error',
            dirname: `logs/${this.DEBUGGER_NAME}/error`,
            filename: `%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: this.maxSize,
            maxFiles: this.maxFiles,
        });
    }

    infoHandler() {
        return new DailyRotateFile({
            level: 'info',
            dirname: `logs/${this.DEBUGGER_NAME}/default`,
            filename: `%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: this.maxSize,
            maxFiles: this.maxFiles,
        });
    }

    debugHandler() {
        return new DailyRotateFile({
            level: 'debug',
            dirname: `logs/${this.DEBUGGER_NAME}/debug`,
            filename: `%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: this.maxSize,
            maxFiles: this.maxFiles,
        });
    }

    rejectionHandler() {
        return new DailyRotateFile({
            filename: `%DATE%.log`,
            dirname: `logs/${this.DEBUGGER_NAME}/rejection`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: this.maxSize,
            maxFiles: this.maxFiles,
        });
    }
}
