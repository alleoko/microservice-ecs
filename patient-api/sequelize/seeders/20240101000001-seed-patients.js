'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('patients', [
      { first_name: 'Alice', last_name: 'Smith', date_of_birth: '1990-01-15', gender: 'female', phone: '09171234567', email: 'alice@example.com', address: 'Manila', status: 'active', created_at: new Date(), updated_at: new Date() },
      { first_name: 'Bob',   last_name: 'Jones', date_of_birth: '1985-06-20', gender: 'male',   phone: '09189876543', email: 'bob@example.com',   address: 'Cebu',   status: 'active', created_at: new Date(), updated_at: new Date() },
    ]);
  },
  async down(queryInterface) { await queryInterface.bulkDelete('patients', null, {}); },
};
