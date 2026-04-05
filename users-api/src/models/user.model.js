const { sequelize } = require('../../database/client');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(100) },
  email: { type: DataTypes.STRING(150), unique: true },
  password: { type: DataTypes.STRING(255) },
  role: { type: DataTypes.ENUM('admin','user'), defaultValue: 'user' },
}, { tableName: 'users', underscored: true });

module.exports = User;
