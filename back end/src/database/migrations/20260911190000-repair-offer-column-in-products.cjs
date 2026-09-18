'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('products');

    if (!columns.offer) {
      await queryInterface.addColumn('products', 'offer', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      });
    }
  },

  async down(queryInterface) {
    const columns = await queryInterface.describeTable('products');

    if (columns.offer) {
      await queryInterface.removeColumn('products', 'offer');
    }
  },
};