const Router = require('express');
const router = new Router();
const propertyController = require('../controllers/propertyController');

router.get('', propertyController.getCatalogProperties);
router.get('/:propertyId', propertyController.getCatalogProperty);
router.get('/:propertyTypeId', propertyController.getCatalogPropertiesByType);
router.get('/adminpanel/properties', propertyController.getAll);
router.get('/adminpanel/:propertyId', propertyController.getOne);
router.post('/create', propertyController.createProperty);
router.post('/update', propertyController.updateProperty);

module.exports = router;