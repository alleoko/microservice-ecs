'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('guarantors', [
      { name: 'Maria Santos', relationship: 'spouse',  phone: '09201234567', email: 'maria@example.com', address: 'Pasig', status: 'active', created_at: new Date(), updated_at: new Date() },
      { name: 'Pedro Reyes',  relationship: 'parent',  phone: '09209876543', email: 'pedro@example.com', address: 'Taguig', status: 'active', created_at: new Date(), updated_at: new Date() },
    ]);
  },
  async down(queryInterface) { await queryInterface.bulkDelete('guarantors', null, {}); },
};
