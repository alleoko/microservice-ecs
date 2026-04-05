require('dotenv').config();
module.exports = {
  port:    process.env.PORT || 30000,
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: { origin: process.env.CORS_ORIGIN || '*' },
  db: {
    name:     process.env.DB_NAME,
    host:     process.env.DB_HOST,
    port:     parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  jwt: { secret: process.env.JWT_TOKEN, expiresIn: '24h' },
  serviceSecret: process.env.SERVICE_SECRET,
};
