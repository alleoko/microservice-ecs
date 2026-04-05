const { sequelize } = require('../../database/client');
const { DataTypes } = require('sequelize');

const Facility = sequelize.define('Facility', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(150) },
  address: { type: DataTypes.TEXT },
  phone: { type: DataTypes.STRING(20) },
  email: { type: DataTypes.STRING(150) },
  type: { type: DataTypes.STRING(100) },
  status: { type: DataTypes.STRING(50), defaultValue: 'active' },
}, { tableName: 'facilities', underscored: true });

module.exports = Facility;
