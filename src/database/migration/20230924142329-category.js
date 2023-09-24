'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'categories',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          description: {
            type: Sequelize.STRING(255),
            allowNull: false,
          },
          created_at: {
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
      await queryInterface.dropTable('categories', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      throw error;
    }
  },
};
