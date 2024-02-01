const { Favorite, Property, PropertyType } = require('../models/models');

class DealController {
    async getFavoritesOfUser(req, res) {
        try {
            const { userId } = req.params;
            
            const favorites = await Favorite.findAll({
                where: { UserId: userId }
            });
            
            if (!favorites || favorites.length === 0) {
                return res.json([]);
              }

            const propertyIds = favorites.map((favorite) => favorite.PropertyId);

            const properties = await Property.findAll({
                where: {
                    Id: propertyIds,
                },
                include: PropertyType
            });

            return res.json(properties);
        }
        catch (err) {
            console.log(err);

            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async createFavorite(req, res) {
        try {
            const favorite = { ...req.body };    

            const existingFavorite = await Favorite.findOne({
                where: {
                  UserId: favorite.UserId,
                  PropertyId: favorite.PropertyId
                },
              });

            if (existingFavorite) {
                console.log('Deal exists');

                return res.status(500).json({ error: 'Deal exists' });
            }

            const createdFavorite = await Favorite.create(favorite);
    
            return res.status(201).json(createdFavorite);
        }
        catch (err) {
            console.log(err);

            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    async deleteFavorite(req, res) {
        try {
            const favorite = { ...req.body }; 
      
          await Favorite.destroy({
            where: { UserId: favorite.UserId, PropertyId: favorite.PropertyId }
          });

          return res.status(200);
        } catch (err) {
          console.log(err);
          return res.status(500).json({ error: 'Ошибка сервера' });
        }
      }
}

module.exports = new DealController();