import { Module } from '@nestjs/common';
import { DebuggerService } from './debugger.service';

@Module({
    imports: [],
    providers: [DebuggerService],
    exports: [DebuggerService],
})
export class DebuggerModule {}
