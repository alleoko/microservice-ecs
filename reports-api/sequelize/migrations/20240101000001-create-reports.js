'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reports', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: Sequelize.STRING(200), allowNull: false },
      type: { type: Sequelize.STRING(100), allowNull: false },
      content: { type: Sequelize.TEXT, allowNull: false },
      generated_by: { type: Sequelize.STRING(150), allowNull: false },
      status: { type: Sequelize.STRING(50), defaultValue: 'draft' },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
    });
  },
  async down(queryInterface) { await queryInterface.dropTable('reports'); },
};
