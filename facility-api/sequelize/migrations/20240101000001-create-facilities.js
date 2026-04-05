'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('facilities', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(150), allowNull: false },
      address: { type: Sequelize.TEXT, allowNull: false },
      phone: { type: Sequelize.STRING(20), allowNull: false },
      email: { type: Sequelize.STRING(150), allowNull: false },
      type: { type: Sequelize.STRING(100), allowNull: false },
      status: { type: Sequelize.STRING(50), defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
    });
  },
  async down(queryInterface) { await queryInterface.dropTable('facilities'); },
};
