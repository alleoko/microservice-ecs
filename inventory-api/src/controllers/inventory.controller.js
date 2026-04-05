const Inventory = require('../models/inventory.model');

exports.getAll = async (req, res) => {
  try {
    const rows = await Inventory.findAll({ order: [['created_at', 'DESC']] });
    return res.json(rows);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const row = await Inventory.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Inventory not found' });
    return res.json(row);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { name, description, quantity, unit, price, category } = req.body;
    if (!name || !quantity) return res.status(400).json({ message: 'name, quantity are required' });
    const data = { name, description, quantity, unit, price, category };
    const row = await Inventory.create(data);
    return res.status(201).json(row);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const row = await Inventory.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Inventory not found' });
    const { name, description, quantity, unit, price, category } = req.body;
    const updates = {};
    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (quantity !== undefined) updates.quantity = quantity;
    if (unit !== undefined) updates.unit = unit;
    if (price !== undefined) updates.price = price;
    if (category !== undefined) updates.category = category;
    if (status !== undefined) updates.status = status;
    await row.update(updates);
    return res.json(row);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const row = await Inventory.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Inventory not found' });
    await row.destroy();
    return res.json({ message: 'Inventory deleted' });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
