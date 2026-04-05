const { sequelize } = require('../../database/client');
const { DataTypes } = require('sequelize');

const Report = sequelize.define('Report', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(200) },
  type: { type: DataTypes.STRING(100) },
  content: { type: DataTypes.TEXT },
  generated_by: { type: DataTypes.STRING(150) },
  status: { type: DataTypes.STRING(50), defaultValue: 'draft' },
}, { tableName: 'reports', underscored: true });

module.exports = Report;
