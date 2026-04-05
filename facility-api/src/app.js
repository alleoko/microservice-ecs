const express = require('express');
const cors    = require('cors');
const config  = require('../config');

const app = express();
app.use(cors({ origin: config.cors.origin }));
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'facility-api' }));
app.use('/api/facilities', require('./routes/facilities.routes'));
app.use((req, res) => res.status(404).json({ message: 'Not found' }));
app.use((err, req, res, next) => res.status(err.status || 500).json({ message: err.message }));

module.exports = app;
