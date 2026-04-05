const { sequelize } = require('../../database/client');
const { DataTypes } = require('sequelize');

const Inventory = sequelize.define('Inventory', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(150) },
  description: { type: DataTypes.TEXT },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  unit: { type: DataTypes.STRING(50) },
  price: { type: DataTypes.DECIMAL(10,2), defaultValue: 0.00 },
  category: { type: DataTypes.STRING(100) },
  status: { type: DataTypes.STRING(50), defaultValue: 'active' },
}, { tableName: 'inventory', underscored: true });

module.exports = Inventory;
