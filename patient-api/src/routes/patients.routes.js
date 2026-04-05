const router = require('express').Router();
const ctrl   = require('../controllers/patient.controller');
const { authenticate, authorizeAdmin } = require('../middlewares/auth.middleware');

router.get('/',       authenticate, ctrl.getAll);
router.get('/:id',    authenticate, ctrl.getById);
router.post('/',      authenticate, authorizeAdmin, ctrl.create);
router.put('/:id',    authenticate, authorizeAdmin, ctrl.update);
router.delete('/:id', authenticate, authorizeAdmin, ctrl.remove);

module.exports = router;
