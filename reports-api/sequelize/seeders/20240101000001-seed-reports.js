'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('reports', [
      { title: 'Monthly Patient Report', type: 'patient',   content: 'Summary of patients for the month', generated_by: 'admin', status: 'published', created_at: new Date(), updated_at: new Date() },
      { title: 'Inventory Report Q1',    type: 'inventory', content: 'Q1 inventory summary',              generated_by: 'admin', status: 'draft',     created_at: new Date(), updated_at: new Date() },
    ]);
  },
  async down(queryInterface) { await queryInterface.bulkDelete('reports', null, {}); },
};
