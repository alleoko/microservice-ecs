const Facility = require('../models/facilitie.model');

exports.getAll = async (req, res) => {
  try {
    const rows = await Facility.findAll({ order: [['created_at', 'DESC']] });
    return res.json(rows);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const row = await Facility.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Facility not found' });
    return res.json(row);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { name, address, phone, email, type, status } = req.body;
    if (!name || !address) return res.status(400).json({ message: 'name, address are required' });
    const data = { name, address, phone, email, type, status };
    const row = await Facility.create(data);
    return res.status(201).json(row);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const row = await Facility.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Facility not found' });
    const { name, address, phone, email, type, status } = req.body;
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (address !== undefined) updates.address = address;
    if (phone !== undefined) updates.phone = phone;
    if (email !== undefined) updates.email = email;
    if (type !== undefined) updates.type = type;
    if (status !== undefined) updates.status = status;
    await row.update(updates);
    return res.json(row);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const row = await Facility.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Facility not found' });
    await row.destroy();
    return res.json({ message: 'Facility deleted' });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
