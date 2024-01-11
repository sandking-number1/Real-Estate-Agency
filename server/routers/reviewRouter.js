const Router = require('express');
const router = new Router();
const reviewContoller = require('../controllers/reviewController');

router.post('/review/create', reviewContoller.createReview);
router.get('', reviewContoller.getAllReviews);

module.exports = router;