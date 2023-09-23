'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
          },
          name: {
            field: 'name',
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          email: {
            field: 'email',
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          password: {
            field: 'password',
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          avatar: {
            field: 'avatar',
            type: Sequelize.TEXT,
            allowNull: true,
          },
          driver_licenses: {
            field: 'driver_licenses',
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          is_active: {
            field: 'is_active',
            type: Sequelize.BOOLEAN(),
            allowNull: false,
          },
          createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
            allowNull: false,
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('users', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  },
};
