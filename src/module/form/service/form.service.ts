import { Injectable } from '@nestjs/common';

//Repository Files
import { FormRepository } from '../repository/form.repository';
import { FormFieldRepository } from '../repository/formField.repository';
import { FormDataRepository } from '../repository/formData.repository';

//DTO Files
import { CreateFormDto } from '../dto/createForm.dto';
import { FormDataDTO } from '../dto/formData.dto';

//Exception Files
import { FormNotExistException } from '../exception/formNotExist.exception';
import { InvalidTypeException } from '../exception/invalidType.exception';
import { FormExistException } from '../exception/formExist.exception';
FormExistException;

import { v4 as uuid } from 'uuid';

@Injectable()
export class FormService {
    constructor(
        private formRepository: FormRepository,
        private formFieldRepository: FormFieldRepository,
        private formDataRepository: FormDataRepository,
    ) {}

    /**
     * This function create form and its field dynamically.
     * @param createFormDto : any type - it contains dynamic fields as param
     * @returns List it is return list of form table insert data
     */

    async createFormAndFields(createFormDto: CreateFormDto) {
        const { title } = createFormDto;
        if (title && title != '') {
            let form = await this.formRepository.findByFormTitle(title);
            if (!form) {
                form = await this.formRepository.create({ title });
                for (const fieldTitle of Object.keys(createFormDto)) {
                    if (fieldTitle !== 'title') {
                        const fieldType = createFormDto[fieldTitle];
                        await this.formFieldRepository.create({
                            fieldTitle: fieldTitle,
                            fieldType: fieldType,
                            formId: form.id,
                        });
                    }
                }
                return { form };
            } else {
                throw new FormExistException(
                    ` ${title} form is already exist. please use other title name instead of this.`,
                );
            }
        } else {
            throw new FormNotExistException(`title should not be blank.`);
        }
    }

    /**
     * This function add data into form field data table based on table value.
     * @query title: string - it contains form title
     * @body bodyData: any - it contains dynamic fields as pass in Post request.
     * @returns Boolean true if its working fine else throw error.
     */
    async fillFormFieldData(title: string, bodyData: any) {
        if (title && title != '') {
            const form = await this.formRepository.findByFormTitle(title);
            if (!form) {
                throw new FormNotExistException(
                    `${title} form does not exist.`,
                );
            }

            const uniqueId = uuid();
            form.formFields.forEach((formField) => {
                const fieldTitle = formField.fieldTitle;
                const fieldValue = bodyData[fieldTitle];
                if (
                    fieldValue ||
                    (fieldValue == false && typeof fieldValue == 'boolean')
                ) {
                    if (typeof fieldValue !== formField.fieldType) {
                        throw new InvalidTypeException(
                            `${fieldTitle} field is not vatid type value. please enter valid data type value.`,
                        );
                    }
                    const formFieldData: FormDataDTO = {
                        uniqueId,
                        formId: form.id,
                        formFieldId: formField.id,
                        fieldValue,
                    };
                    this.formDataRepository.create(formFieldData);
                }
            });
        } else {
            throw new FormNotExistException(`title should not be blank.`);
        }

        return true;
    }

    /**
     * This function used to generate data based on unique id.
     * @param dataObj: string - it contains form, form field and form field data table value.
     * @returns List - it returns list of objects based on multiple table
     */
    convertToCustomResponse(dataObj: any): any {
        const result: any = {};

        for (const key in dataObj) {
            const { uniqueId, fieldValue, formField } = dataObj[key];
            const fieldTitle = formField.fieldTitle;
            if (!result[uniqueId]) {
                result[uniqueId] = {};
            }
            result[uniqueId][fieldTitle] = fieldValue;
        }

        return result;
    }

    /**
     * this function is retrive all form field data based on form title
     * @query title - it is contain form title which is passed in query param
     * @return List - it is contains list of form field data based on form title
     */
    async getFormFieldData(title: string): Promise<any> {
        const form = await this.formRepository.findByFormTitle(title);
        if (!form) {
            throw new FormNotExistException(`${title} form does not exist.`);
        }

        const formFieldDataObj = await this.formDataRepository.findByFormId(
            form.id,
        );
        if (!formFieldDataObj) {
            return [];
        }
        return this.convertToCustomResponse(formFieldDataObj);
    }
}
