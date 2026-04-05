'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('inventory', [
      { name: 'Paracetamol 500mg', description: 'Pain reliever', quantity: 500, unit: 'tablet', price: 2.50, category: 'medicine', status: 'active', created_at: new Date(), updated_at: new Date() },
      { name: 'Surgical Gloves',   description: 'Latex gloves',  quantity: 200, unit: 'pair',   price: 15.00, category: 'supplies', status: 'active', created_at: new Date(), updated_at: new Date() },
    ]);
  },
  async down(queryInterface) { await queryInterface.bulkDelete('inventory', null, {}); },
};
