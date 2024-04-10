import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class DatabaseService {
    constructor(private configService: ConfigService) {}
    async seedingData() {
        // Seeding data in database;

        return;
    }
}
