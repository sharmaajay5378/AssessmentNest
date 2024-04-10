import { Controller, Get } from '@nestjs/common';
@Controller('health-check')
export class AppController {
    @Get()
    sendResponse() {
        return 'Service running successfully ...';
    }
}
