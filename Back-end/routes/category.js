var express = require('express');
const { isAuthenticated } = require('../middleware/authenticate');
var router = express.Router();

const categoryController = require('../controllers').categoryController;

router.get('/', categoryController.list);
router.get('/page/:page/size/:limit', categoryController.paginate);
router.get('/:id', categoryController.getById);
router.post('/', isAuthenticated, categoryController.add);
router.put('/:id', isAuthenticated, categoryController.update);
router.delete('/:id', isAuthenticated, categoryController.delete);

module.exports = router;