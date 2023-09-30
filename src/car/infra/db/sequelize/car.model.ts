import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { Specification } from '../../../../speficiation/domain';

type CarModelProps = {
  id: string;
  name: string;
  description: string;
  dailyRate: number;
  available: boolean;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categorId: string;
  specifications: Specification[];
  created_at: Date;
};

@Table({ tableName: 'cars', timestamps: false })
export class CarModel extends Model<CarModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare name: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare description: string;

  @Column({ allowNull: false, type: DataType.FLOAT(11, 4) })
  declare dailyRate: number;

  @Column({ allowNull: false, type: DataType.BOOLEAN() })
  declare available: boolean;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare licensePlate: string;

  @Column({ allowNull: false, type: DataType.FLOAT(11, 4) })
  declare fineAmount: number;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare brand: string;

  @Column({ allowNull: false, type: DataType.UUID })
  declare categorId: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(255),
    references: { model: 'specifications' },
  })
  declare specifications: Specification[];

  @Column({ allowNull: false, type: DataType.DATE(6) })
  declare created_at: Date;
}
