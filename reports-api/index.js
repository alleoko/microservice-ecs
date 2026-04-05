require('dotenv').config();
const app = require('./src/app');
const { connectDB } = require('./database/client');
const PORT = process.env.PORT || 30000;
const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`[${process.env.NODE_ENV}] reports-api running on port ${PORT}`));
};
start();
