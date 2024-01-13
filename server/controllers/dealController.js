const { Deal } = require('../models/models');

class DealController {
    async getOpenedDeals(req, res) {
        try {
            const deals = await Deal.findAll({
                where: { isOpened: true }
            });

            return res.json(deals);
        }
        catch (err) {
            console.log(err);

            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async createDeal(req, res) {
        try {
            const deal = { ...req.body };    
    
            const createdDeal = await Deal.create(deal);
    
            return res.status(201).json(createdDeal);
        }
        catch (err) {
            console.log(err);

            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
}

module.exports = new DealController();