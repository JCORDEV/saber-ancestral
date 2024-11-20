var express = require('express');
const { isAuthenticated } = require('../middleware/authenticate');
var router = express.Router();

const plantController = require('../controllers').plantController;

router.get('/', plantController.list);
router.get('/page/:page/size/:limit', plantController.paginate);
router.get('/full', plantController.listFull);
router.get('/search/:term', plantController.getSearch);
router.get('/:id', plantController.getFullById);
// router.get('/search/:common_name', plantController.getByName);
router.post('/', isAuthenticated, plantController.add);
router.put('/:id', isAuthenticated, plantController.update);
router.delete('/:id', isAuthenticated, plantController.delete);
router.post('/:plantId/add-experts', isAuthenticated, plantController.addExperts);
router.post('/:plantId/remove-expert/:expertId', isAuthenticated, plantController.removeExpert);
router.put('/:plantId/update-experts', isAuthenticated, plantController.updateExperts);

module.exports = router;