import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { FormEntity } from './form.entity';
import { FormFieldEntity } from './formField.entity';
import { FormDataDTO } from '../dto/formData.dto';

@Table({ tableName: 'form_field_data' })
export class FormDataEntity extends Model<FormDataDTO> {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
    })
    id: number;

    @Column({
        primaryKey: true,
        type: DataType.UUID,
    })
    uniqueId: string;

    @ForeignKey(() => FormEntity)
    @Column
    formId: number;

    @ForeignKey(() => FormFieldEntity)
    @Column
    formFieldId: number;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    fieldValue: string;

    @BelongsTo(() => FormEntity)
    form: FormEntity;

    @BelongsTo(() => FormFieldEntity)
    formField: FormEntity;
}
