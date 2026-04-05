const { sequelize } = require('../../database/client');
const { DataTypes } = require('sequelize');

const Patient = sequelize.define('Patient', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  first_name: { type: DataTypes.STRING(100) },
  last_name: { type: DataTypes.STRING(100) },
  date_of_birth: { type: DataTypes.DATEONLY },
  gender: { type: DataTypes.ENUM('male','female','other') },
  phone: { type: DataTypes.STRING(20) },
  email: { type: DataTypes.STRING(150) },
  address: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING(50), defaultValue: 'active' },
}, { tableName: 'patients', underscored: true });

module.exports = Patient;
