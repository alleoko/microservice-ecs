'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patients', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      first_name: { type: Sequelize.STRING(100), allowNull: false },
      last_name: { type: Sequelize.STRING(100), allowNull: false },
      date_of_birth: { type: Sequelize.DATEONLY, allowNull: false },
      gender: { type: Sequelize.ENUM('male','female','other'), allowNull: false },
      phone: { type: Sequelize.STRING(20), allowNull: false },
      email: { type: Sequelize.STRING(150), allowNull: false },
      address: { type: Sequelize.TEXT, allowNull: false },
      status: { type: Sequelize.STRING(50), defaultValue: 'active' },
      created_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') },
    });
  },
  async down(queryInterface) { await queryInterface.dropTable('patients'); },
};
