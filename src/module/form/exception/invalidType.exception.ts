import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTypeException extends HttpException {
    constructor(message: string) {
        super(`InvalidTypeException: ${message}`, HttpStatus.BAD_REQUEST);
    }
}
