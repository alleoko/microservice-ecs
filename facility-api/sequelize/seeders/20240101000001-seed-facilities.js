'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('facilities', [
      { name: 'Main Hospital', address: 'Makati City', phone: '028001234', email: 'main@hospital.com', type: 'hospital', status: 'active', created_at: new Date(), updated_at: new Date() },
      { name: 'North Clinic',  address: 'QC',          phone: '028005678', email: 'north@clinic.com',  type: 'clinic',   status: 'active', created_at: new Date(), updated_at: new Date() },
    ]);
  },
  async down(queryInterface) { await queryInterface.bulkDelete('facilities', null, {}); },
};
