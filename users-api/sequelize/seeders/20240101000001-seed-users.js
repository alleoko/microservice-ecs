'use strict';
const bcrypt = require('bcryptjs');
module.exports = {
  async up(queryInterface) {
    const hash = await bcrypt.hash('password123', 10);
    await queryInterface.bulkInsert('users', [
      { name: 'Admin User', email: 'admin@example.com', password: hash, role: 'admin', created_at: new Date(), updated_at: new Date() },
      { name: 'John Doe',   email: 'john@example.com',  password: hash, role: 'user',  created_at: new Date(), updated_at: new Date() },
    ]);
  },
  async down(queryInterface) { await queryInterface.bulkDelete('users', null, {}); },
};
