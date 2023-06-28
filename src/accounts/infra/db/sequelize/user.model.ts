import {
  Column,
  DataType,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';

type UserModelProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  driver_licenses: string;
  is_active?: boolean;
  created_at?: Date;
};

@Table({ tableName: 'users', timestamps: false })
export class UserModel extends Model<UserModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare name: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare password: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  declare avatar: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare driver_licenses: string;

  @Column({ allowNull: false, type: DataType.BOOLEAN })
  declare is_active: boolean;

  @Column({ allowNull: false, type: DataType.DATE(6) })
  declare created_at: Date;
}
