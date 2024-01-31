const Router = require('express');
const router = new Router();
const propertyController = require('../controllers/propertyController');
const propertyTypeController = require('../controllers/propertyTypeController');

router.get('', propertyController.getCatalogProperties);
router.get('/types', propertyTypeController.getAll);
router.get('/search', propertyController.filterProperties);
router.get("/avatar/:id", propertyController.getAvatar);
router.get('/:propertyId', propertyController.getCatalogProperty);
router.post('/create', propertyController.createProperty);

module.exports = router;