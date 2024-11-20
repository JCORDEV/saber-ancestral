var express = require('express');
const { isAuthenticated } = require('../middleware/authenticate');
var router = express.Router();

const expertController = require('../controllers').expertController;

router.get('/', expertController.list);
router.get('/page/:page/size/:limit', expertController.paginate);
router.get('/:id', expertController.getById);
router.post('/', isAuthenticated, expertController.add);
router.put('/:id', isAuthenticated, expertController.update);
router.delete('/:id', isAuthenticated, expertController.delete);

module.exports = router;