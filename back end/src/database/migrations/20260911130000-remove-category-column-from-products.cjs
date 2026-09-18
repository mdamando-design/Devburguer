'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const columns = await queryInterface.describeTable('products');

    if (columns.category) {
      await queryInterface.removeColumn('products', 'category');
    }
  },

  async down(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('products');

    if (!columns.category) {
      await queryInterface.addColumn('products', 'category', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },
};
