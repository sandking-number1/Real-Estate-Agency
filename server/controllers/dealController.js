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

    async close(req, res) {
        try {
          const { id } = req.params;
      
          const deal = await Deal.findOne({
            where: { Id: id }
          });
      
          deal.isClosed = true;
      
          const updatedDeal = {
            isClosed: true
          };
      
          await Deal.update(updatedDeal, {
            where: { Id: id }
          });
      


          // Return the updated deal
          return res.json(deal);
        } catch (err) {
          console.log(err);
          return res.status(500).json({ error: 'Ошибка сервера' });
        }
      }

    async sell(req, res) {
        try {
          const { id } = req.params;
          console.log(id);
      
          const deal = await Deal.findOne({
            where: { Id: id }
          });
          console.log(deal);
      
          const property = await Property.findOne({
            where: { Id: deal.PropertyId }
          });
          console.log(property);
      
          const updatedDeal = {
            isClosed: true,
            isSold: true
          };
      
          const updatedProperty = {
            isSold: true
          };
      
          await Deal.update(updatedDeal, {
            where: { Id: id }
          }).then((result) => {
            console.log(`Updated ${result[0]} row(s)`);
          });
      
          await Property.update(updatedProperty, {
            where: { Id: deal.PropertyId }
          });

          // Return the updated deal
          return res.json(deal);
        } catch (err) {
          console.log(err);
          return res.status(500).json({ error: 'Ошибка сервера' });
        }
      }
}

module.exports = new DealController();