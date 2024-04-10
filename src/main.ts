import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { AppModule } from './app/app.module';
import { DEFAULT_ERROR } from './constants/error/errors/default';
import { HttpExceptionWrapper } from './utils/error/error.http.wrapper';
import { IFieldError } from './utils/error/error.interface';
async function bootstrap() {
    try {
        const app = await NestFactory.create(AppModule);

        // Getting configuration for app server
        const configService = app.get(ConfigService);
        const env: string = configService.get('app.env')!;
        const host: string = configService.get('app.http.host')!;
        const port: number = configService.get('app.http.port')!;
        const versioning: boolean = configService.get('app.versioning.on')!;
        const globalPrefix: string = configService.get('app.globalPrefix')!;

        // Setting environment in NODE_ENV
        process.env.NODE_ENV = env;

        // Setting validation pipe for DTO
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true, //whitelist on allows selected dto field
                transform: true, // change the string values in json to number which are defined as number
                exceptionFactory: (validationErrors: ValidationError[]) => {
                    const getError = (
                        error: ValidationError[],
                        appendFieldName = '',
                    ): IFieldError[] => {
                        return error.reduce((value, error) => {
                            if (error.children?.length) {
                                const newError = getError(
                                    error.children,
                                    `${appendFieldName}${error.property}.`,
                                );
                                value = [...value, ...newError];
                            } else {
                                value = [
                                    ...value,
                                    {
                                        field: appendFieldName + error.property,
                                        error: Object.values(
                                            error.constraints,
                                        ).join(', '),
                                    },
                                ];
                            }
                            return value;
                        }, [] as IFieldError[]);
                    };

                    return new HttpExceptionWrapper(
                        DEFAULT_ERROR.DATA_VALIDATION_ERROR,
                        getError(validationErrors),
                    );
                },
            }),
        );

        // Setting logger for logging info and error
        const logger = new Logger();

        // Setting global prefix for api end point
        app.setGlobalPrefix(globalPrefix);

        // Setting versioning for API
        if (versioning) {
            app.enableVersioning({
                type: VersioningType.URI,
                defaultVersion: ['1'],
                prefix: configService.get('app.versioning.prefix'),
            });
        }

        //swagger document
        const config = new DocumentBuilder()
            .setTitle('Nest Base Setup')
            .setDescription('Base setup api description')
            .setVersion('1.0')
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('swagger', app, document);

        // Starting server at given port and host id
        await app.listen(port, host);

        logger.log(`App Environment is ${env}`, 'App');
        logger.log(`App Versioning is ${versioning}`, 'App');
        logger.log(`Server running on ${await app.getUrl()}`, 'App');
    } catch (error) {
        console.log({ error });
    }
}
bootstrap();
