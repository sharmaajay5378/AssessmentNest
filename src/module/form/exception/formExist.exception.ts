import { HttpException, HttpStatus } from '@nestjs/common';

export class FormExistException extends HttpException {
    constructor(message: string) {
        super(`FormExistException: ${message}`, HttpStatus.NOT_ACCEPTABLE);
    }
}
