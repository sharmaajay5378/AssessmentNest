import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { FormEntity } from './form.entity';
import { FormFieldDTO } from '../dto/formField.dto';

@Table({ tableName: 'form_field' })
export class FormFieldEntity extends Model<FormFieldDTO> {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true, // This makes the id auto-incrementing
    })
    id: number;

    @ForeignKey(() => FormEntity)
    @Column
    formId: number;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    fieldTitle: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    fieldType: string;

    @BelongsTo(() => FormEntity)
    form: FormEntity;
}
