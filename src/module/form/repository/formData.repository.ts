import { Injectable } from '@nestjs/common';
import { FormDataDTO } from '../dto/formData.dto';
import { FormDataEntity } from '../entity/formData.entity';
import { FormFieldEntity } from '../entity/formField.entity';

@Injectable()
export class FormDataRepository {
    async create(formDataDTO: FormDataDTO) {
        return await FormDataEntity.create(formDataDTO);
    }

    async findByFormId(formId: number): Promise<FormDataEntity[] | null> {
        return await FormDataEntity.findAll({
            where: { formId },
            include: [FormFieldEntity],
        });
    }
}
