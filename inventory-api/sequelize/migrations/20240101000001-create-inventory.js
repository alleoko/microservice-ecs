'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inventory', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(150), allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      quantity: { type: Sequelize.INTEGER, defaultValue: 0 },
      unit: { type: Sequelize.STRING(50), allowNull: false },
      price: { type: Sequelize.DECIMAL(10,2), defaultValue: 0.00 },
      category: { type: Sequelize.STRING(100), allowNull: false },
      status: { type: Sequelize.STRING(50), defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
    });
  },
  async down(queryInterface) { await queryInterface.dropTable('inventory'); },
};
