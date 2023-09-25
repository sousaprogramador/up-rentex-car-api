import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';

type SpecificationModelProps = {
  id: string;
  name: string;
  description: string;
  created_at?: Date;
};

@Table({ tableName: 'specifications', timestamps: false })
export class SpecificationModel extends Model<SpecificationModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare name: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare description: string;

  @Column({ allowNull: false, type: DataType.DATE(6) })
  declare created_at: Date;
}
