exports.notFound = (req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.url} not found` });
};

exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
};
