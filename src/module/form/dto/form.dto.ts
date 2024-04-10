import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FormDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;
}
