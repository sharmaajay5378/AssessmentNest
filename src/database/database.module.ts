import { Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';
import { DatabaseService } from './database.service';

@Module({
    providers: [
        // Service
        DatabaseService,

        // Providers
        ...databaseProvider,
    ],
    exports: [...databaseProvider],
})
export class DatabaseModule {}
