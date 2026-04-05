const axios = require('axios');
const config = require('../../config');

const createClient = (baseURL) =>
  axios.create({
    baseURL,
    timeout: 10000,
    headers: { 'x-service-secret': config.serviceSecret },
  });

module.exports = {
  usersClient:     createClient(config.services.usersApi),
  patientClient:   createClient(config.services.patientApi),
  facilityClient:  createClient(config.services.facilityApi),
  guarantorClient: createClient(config.services.guarantorApi),
  inventoryClient: createClient(config.services.inventoryApi),
  reportsClient:   createClient(config.services.reportsApi),
};
