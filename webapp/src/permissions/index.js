const ROLES = {
  ADMIN: 'admin',
  USER:  'user',
};

const authorizeAdmin = (req, res, next) => {
  if (req.user?.role !== ROLES.ADMIN)
    return res.status(403).json({ message: 'Forbidden' });
  next();
};

module.exports = { ROLES, authorizeAdmin };
