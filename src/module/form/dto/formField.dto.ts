import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FormFieldDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    formId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fieldTitle: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fieldType: string;
}
