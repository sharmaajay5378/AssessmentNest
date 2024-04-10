import { Injectable } from '@nestjs/common';
import { FormDTO } from '../dto/form.dto';
import { FormFieldEntity } from '../entity/formField.entity';
import { FormEntity } from '../entity/form.entity';

@Injectable()
export class FormRepository {
    async create(formDTO: FormDTO) {
        return await FormEntity.create(formDTO);
    }
    async findByFormTitle(title: string): Promise<FormEntity | null> {
        return await FormEntity.findOne({
            where: { title },
            include: [FormFieldEntity],
        });
    }
}
