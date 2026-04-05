const jwt    = require('jsonwebtoken');
const config = require('../../config');

const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized' });
  try {
    req.user = jwt.verify(header.split(' ')[1], config.jwt.secret);
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin')
    return res.status(403).json({ message: 'Forbidden' });
  next();
};

module.exports = { authenticate, authorizeAdmin };
