import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
} from '@nestjs/common';
import { Response as ResponseCustom } from 'src/utils/response/response.decorator';
import { responseName } from '../response/response.constants';

import { FormService } from '../service/form.service';

/**
 * Controller responsible for handling HTTP requests related to Form.
 */
@Controller()
export class FormController {
    constructor(private formService: FormService) {}

    //POST API to create the form and its field.
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ResponseCustom(responseName.FORM_CREATED)
    async createFormAndFields(@Body() createFormAndFieldDto: any) {
        return await this.formService.createFormAndFields(
            createFormAndFieldDto,
        );
    }

    /**
     * POST request handler for add all Form Field data based on form title.
     * @Query title - The title of the form to retrieve data
     * @Body formDataDTO - it contains dynamic data of body
     * @returns List of Custom Form field data
     */
    @Post('fill-data')
    @HttpCode(HttpStatus.CREATED)
    @ResponseCustom(responseName.ADD_FORM_FIELD_DATA)
    async fillFormFieldData(
        @Query('title') title: string,
        @Body() formDataDTO: any,
    ) {
        return await this.formService.fillFormFieldData(title, formDataDTO);
    }

    /**
     * GET request handler for retrieving all Form Field data based on form title.
     * @Query title - The title of the form to retrieve data
     * @returns List of Custom Form field data
     */
    @Get('get-data')
    @HttpCode(HttpStatus.OK)
    @ResponseCustom(responseName.GET_ALL_FORM_DATA)
    async getFormFieldData(@Query('title') title: string) {
        return await this.formService.getFormFieldData(title);
    }
}
