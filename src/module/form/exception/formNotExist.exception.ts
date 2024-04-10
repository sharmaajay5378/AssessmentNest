import { HttpException, HttpStatus } from '@nestjs/common';

export class FormNotExistException extends HttpException {
    constructor(message: string) {
        super(`FormNotExistException: ${message}`, HttpStatus.NOT_FOUND);
    }
}
