const { sequelize } = require('../../database/client');
const { DataTypes } = require('sequelize');

const Guarantor = sequelize.define('Guarantor', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(150) },
  relationship: { type: DataTypes.STRING(100) },
  phone: { type: DataTypes.STRING(20) },
  email: { type: DataTypes.STRING(150) },
  address: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING(50), defaultValue: 'active' },
}, { tableName: 'guarantors', underscored: true });

module.exports = Guarantor;
