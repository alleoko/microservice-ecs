const Guarantor = require('../models/guarantor.model');

exports.getAll = async (req, res) => {
  try {
    const rows = await Guarantor.findAll({ order: [['created_at', 'DESC']] });
    return res.json(rows);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const row = await Guarantor.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Guarantor not found' });
    return res.json(row);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { name, relationship, phone, email, address, status } = req.body;
    if (!name || !phone) return res.status(400).json({ message: 'name, phone are required' });
    const data = { name, relationship, phone, email, address, status };
    const row = await Guarantor.create(data);
    return res.status(201).json(row);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const row = await Guarantor.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Guarantor not found' });
    const { name, relationship, phone, email, address, status } = req.body;
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (relationship !== undefined) updates.relationship = relationship;
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
    const row = await Guarantor.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Guarantor not found' });
    await row.destroy();
    return res.json({ message: 'Guarantor deleted' });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
