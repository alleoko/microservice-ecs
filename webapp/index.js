require('dotenv').config();
const app = require('./src/server');
const config = require('./config');

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`[${process.env.NODE_ENV}] webapp running on port ${PORT}`);
});
