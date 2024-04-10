import { HttpStatus } from '@nestjs/common';
import { iResponseStatusMessage } from 'src/utils/response/response.interface';

export const responseName = {
    FORM_CREATED: 'FORM_CREATED',
    ADD_FORM_FIELD_DATA: 'ADD_FORM_FIELD_DATA',
    GET_ALL_FORM_DATA: 'GET_ALL_FORM_DATA',
    FORM_TYPE_FETCHED: 'FORM_TYPE_FETCHED',
    GET_ALL_FORM_TYPES: 'GET_ALL_FORM_TYPES',
};

export const responseInfo: Record<string, iResponseStatusMessage> = {
    FORM_CREATED: {
        message: 'Form created successfully',
        statusCode: HttpStatus.CREATED,
    },
    ADD_FORM_FIELD_DATA: {
        message: 'Form field data added successfully',
        statusCode: HttpStatus.CREATED,
    },
    GET_ALL_FORM_DATA: {
        message: 'Form field data fetched successfully',
        statusCode: HttpStatus.OK,
    },
    FORM_TYPE_FETCHED: {
        message: 'Form type fetched successfully',
        statusCode: HttpStatus.OK,
    },
    GET_ALL_FORM_TYPE: {
        message: 'Form types fetched successfully',
        statusCode: HttpStatus.OK,
    },
};
