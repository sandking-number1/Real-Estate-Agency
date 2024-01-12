const Router = require('express');
const router = new Router();
const propertyController = require('../controllers/propertyController');

router.get('', propertyController.getCatalogProperties);
router.get("/avatar/:id", propertyController.getAvatar);
router.get('/:propertyId', propertyController.getCatalogProperty);

module.exports = router;