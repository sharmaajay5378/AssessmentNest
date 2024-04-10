import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FormDataDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    uniqueId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    formId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    formFieldId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fieldValue: string;
}
