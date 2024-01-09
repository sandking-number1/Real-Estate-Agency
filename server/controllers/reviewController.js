const { Review } = require('../models/models');

class ReviewController {
    async createReview(req, res) {
        const { review } = req.body;

        try {
            Review.create(review);

            return res.status(201).json({ review });
        }
        catch (err) {
            console.error(err);

            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }    

  async getAllReviews(req, res) {
        try {
            const reviews = await Review.findAll();

            return res.json(reviews);
        }
        catch (err) {
            console.error(err);
            
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    } 
}

module.exports = new ReviewController();