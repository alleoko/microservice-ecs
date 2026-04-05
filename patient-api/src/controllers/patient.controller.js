const Patient = require('../models/patient.model');

exports.getAll = async (req, res) => {
  try {
    const rows = await Patient.findAll({ order: [['created_at', 'DESC']] });
    return res.json(rows);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const row = await Patient.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Patient not found' });
    return res.json(row);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { first_name, last_name, date_of_birth, gender, phone, email } = req.body;
    if (!first_name || !last_name || !date_of_birth) return res.status(400).json({ message: 'first_name, last_name, date_of_birth are required' });
    const data = { first_name, last_name, date_of_birth, gender, phone, email };
    const row = await Patient.create(data);
    return res.status(201).json(row);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const row = await Patient.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Patient not found' });
    const { first_name, last_name, date_of_birth, gender, phone, email } = req.body;
    const updates = {};
    if (first_name !== undefined) updates.first_name = first_name;
    if (last_name !== undefined) updates.last_name = last_name;
    if (date_of_birth !== undefined) updates.date_of_birth = date_of_birth;
    if (gender !== undefined) updates.gender = gender;
    if (phone !== undefined) updates.phone = phone;
    if (email !== undefined) updates.email = email;
    if (address !== undefined) updates.address = address;
    if (status !== undefined) updates.status = status;
    await row.update(updates);
    return res.json(row);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const row = await Patient.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Patient not found' });
    await row.destroy();
    return res.json({ message: 'Patient deleted' });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
