const Router = require('express');
const router = new Router();
const reviewContoller = require('../controllers/reviewController');

router.get('', reviewContoller.getAllReviews);
router.post('/create', reviewContoller.createReview);

module.exports = router;