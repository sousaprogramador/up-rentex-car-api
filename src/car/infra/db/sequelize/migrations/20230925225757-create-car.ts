import { MigrationFn } from 'umzug';
import { Sequelize, DataTypes } from 'sequelize';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('cars', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    dailyRate: {
      field: 'daily_rate',
      type: DataTypes.FLOAT(16, 4),
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN(),
      allowNull: false,
    },
    licensePlate: {
      field: 'license_plate',
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fineAmount: {
      field: 'fine_amount',
      type: DataTypes.FLOAT(16, 4),
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    categorId: {
      field: 'categor_id',
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE(3),
      allowNull: false,
    },
  });
};
export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('cars');
};
