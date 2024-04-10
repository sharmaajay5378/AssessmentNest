import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { DatabaseModule } from 'src/database/database.module';
import { DebuggerModule } from 'src/utils/debugger/debugger.module';
import { DebuggerService } from 'src/utils/debugger/debugger.service';
import { ErrorModule } from 'src/utils/error/error.module';
import ConfigModule from './config.module';
@Module({
    imports: [
        // Config setup for environment file and values
        ConfigModule,

        // Winston setup for logging
        WinstonModule.forRootAsync({
            inject: [DebuggerService],
            imports: [DebuggerModule],
            useFactory: (debuggerService: DebuggerService) =>
                debuggerService.createLogger(),
        }),

        // Error Module
        ErrorModule,

        // Database Modules
        DatabaseModule,
    ],
})
export class CoreModule {}
