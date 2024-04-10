import { Module } from '@nestjs/common';
import { FormService } from './service/form.service';
import { FormController } from './controller/form.controller';
import { FormRepository } from './repository/form.repository';
import { FormFieldRepository } from './repository/formField.repository';
import { FormDataRepository } from './repository/formData.repository';

@Module({
    exports: [FormRepository, FormFieldRepository, FormDataRepository],
    providers: [
        FormRepository,
        FormService,
        FormFieldRepository,
        FormDataRepository,
    ],
    controllers: [FormController],
})
export class FormModule {}
