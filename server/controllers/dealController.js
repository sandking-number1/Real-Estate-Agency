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
}

module.exports = new DealController();