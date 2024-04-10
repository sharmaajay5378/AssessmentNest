import { registerAs } from '@nestjs/config';

export default registerAs(
    'database',
    (): Record<string, string | number | boolean | object> => ({
        db: {
            //todo // change this this to mysql
            dialect: process.env.DB_DIALECT || 'mysql',
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            username: process.env.DB_USERNAME || 'mysql',
            password: process.env.DB_PASSWORD || 'dev1',
            databaseName: process.env.DB_NAME || 'nodedemo',
            alterTable: process?.env?.DB_ALTER_TABLE == 'false',
        },
    }),
);
