const express = require('express');
const cors    = require('cors');
const morgan  = require('morgan');
const proxy   = require('express-http-proxy');
const config  = require('../config');
const { authenticate } = require('./middlewares/auth.middleware');
const { notFound, errorHandler } = require('./errors/error.handler');

const app = express();

app.use(cors({ origin: config.cors }));
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'webapp' }));

// Proxy routes to internal API services
app.use('/api/users',      authenticate, proxy(config.services.usersApi));
app.use('/api/patients',   authenticate, proxy(config.services.patientApi));
app.use('/api/facilities', authenticate, proxy(config.services.facilityApi));
app.use('/api/guarantors', authenticate, proxy(config.services.guarantorApi));
app.use('/api/inventory',  authenticate, proxy(config.services.inventoryApi));
app.use('/api/reports',    authenticate, proxy(config.services.reportsApi));

// Auth route (no auth required - proxied to users-api)
app.use('/api/auth', proxy(config.services.usersApi));

app.use(notFound);
app.use(errorHandler);

module.exports = app;
