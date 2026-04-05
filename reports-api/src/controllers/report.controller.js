const Report = require('../models/report.model');

exports.getAll = async (req, res) => {
  try {
    const rows = await Report.findAll({ order: [['created_at', 'DESC']] });
    return res.json(rows);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const row = await Report.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Report not found' });
    return res.json(row);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const { title, type, content, generated_by, status } = req.body;
    if (!title || !type) return res.status(400).json({ message: 'title, type are required' });
    const data = { title, type, content, generated_by, status };
    const row = await Report.create(data);
    return res.status(201).json(row);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.update = async (req, res) => {
  try {
    const row = await Report.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Report not found' });
    const { title, type, content, generated_by, status } = req.body;
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (type !== undefined) updates.type = type;
    if (content !== undefined) updates.content = content;
    if (generated_by !== undefined) updates.generated_by = generated_by;
    if (status !== undefined) updates.status = status;
    await row.update(updates);
    return res.json(row);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};

exports.remove = async (req, res) => {
  try {
    const row = await Report.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Report not found' });
    await row.destroy();
    return res.json({ message: 'Report deleted' });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
