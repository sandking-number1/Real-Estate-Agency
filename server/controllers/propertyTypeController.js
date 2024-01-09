const { PropertyType } = require('../models/models');

class PropertyTypeController {
    async getAll(req, res) {
        try {
            const propertyTypes = await PropertyType.findAll();
    
            return res.json(propertyTypes);
        }
        catch (err) {
            console.error(err);

            return res.sendStatus(500).json({ error: 'Ошибка сервера.' });
        }
    }
}

module.exports = new PropertyTypeController();