import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { FormDTO } from '../dto/form.dto';
import { FormFieldEntity } from './formField.entity';

@Table({ tableName: 'form' })
export class FormEntity extends Model<FormDTO> {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
    })
    id: number;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    title: string;

    @HasMany(() => FormFieldEntity)
    formFields: FormFieldEntity[];
}
