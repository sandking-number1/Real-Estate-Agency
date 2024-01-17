const { Deal, Property } = require('../models/models');

class DealController {
    async getOpenedDeals(req, res) {
        try {
            const deals = await Deal.findAll({
                where: { isClosed: false }
            });

            return res.json(deals);
        }
        catch (err) {
            console.log(err);

            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async getDealsOfUser(req, res) {
        try {
            const { userId } = req.params;

            const deals = await Deal.findAll({
                where: { UserId: userId, isClosed: false }
            });
            
            const propertyIds = deals.map((deal) => deal.PropertyId);
            const properties = await Property.findAll({
                where: {
                    Id: propertyIds,
                },
            });

            return res.json(properties);
        }
        catch (err) {
            console.log(err);

            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async getCompletedDealsOfUser(req, res) {
        try {
            const { userId } = req.params;

            const deals = await Deal.findAll({
                where: { UserId: userId, isSold: true }
            });
            
            const propertyIds = deals.map((deal) => deal.PropertyId);
            const properties = await Property.findAll({
                where: {
                    Id: propertyIds,
                },
            });

            return res.json(properties);
        }
        catch (err) {
            console.log(err);

            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async createDeal(req, res) {
        try {
            const deal = { ...req.body };    
            console.log(deal);
            const existingDeal = await Deal.findOne({
                where: {
                  UserId: deal.UserId,
                  PropertyId: deal.PropertyId,
                  isClosed: false,
                  isSold: false
                },
              });

            if (existingDeal) {
                console.log('Deal exists');

                return res.status(500).json({ error: 'Deal exists' });
            }

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