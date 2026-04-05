require('dotenv').config();
const cfg = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host:     process.env.DB_HOST,
  port:     parseInt(process.env.DB_PORT || '3306', 10),
  dialect:  'mysql',
};
module.exports = { development: cfg, staging: cfg, production: { ...cfg, logging: false } };
