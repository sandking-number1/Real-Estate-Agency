const { Property, PropertyType } = require('../models/models');

class PropertyController {
    async getAll(req, res) {
        try {
            const properties = await Property.findAll();
    
            return res.json(properties);
        }
        catch (err) {
            console.error(err);

            return res.sendStatus(500).json({ error: 'Ошибка сервера.' });
        }
    }

    async getCatalogPropertiesByType(req, res) {
        try {
            const { propertyTypeId } = req.params;

            const properties = await Property.findAll({
                where: { IsSold: false, propertyTypeId: propertyTypeId }
            });
    
            return res.json(properties);
        }
        catch (err) {
            console.error(err);

            return res.sendStatus(500).json({ error: 'Ошибка сервера.' });
        }
    }

    async getOne(req, res) {
        const { propertyId } = req.params;
    
        try {
            const property = await Property.findByPk(propertyId);
    
            if (!property) {
                return res.status(404).json({ error: 'Собственность не найдена.' });
            }
    
            return res.status(200).json({ property });
        }
        catch (err) {
            console.error(err);

            return res.status(500).json({ error: 'Ошибка сервера.' });
        }
    }

    async getCatalogProperties(req, res) {
        try {
            const properties = await Property.findAll({
                where: { isSold: false }
            });
    
            return res.json(properties);
        }
        catch (err) {
            console.error(err);

            return res.sendStatus(500).json({ error: 'Ошибка сервера.' });
        }
    }

    async getCatalogProperty(req, res) {
        const { propertyId } = req.params;
    
        try {
            const property = await Property.findByPk(propertyId);
    
            if (!property || property.isSold == true) {
                return res.status(404).json({ error: 'Собственность не найдена.' });
            }
    
            return res.status(200).json({ property });
        }
        catch (err) {
            console.error(err);

            return res.status(500).json({ error: 'Ошибка сервера.' });
        }
    }

    async createProperty(req, res) {
        try {
            const property = { ...req.body };    
    
            const createdProperty = await Property.create(property);
    
            return res.status(201).json(createdProperty);
        }
        catch (err) {
            console.error(err);

            return res.status(500).json({ error: 'Ошибка сервера.' });
        }
    }

    async updateProperty(req, res) {
        const { propertyId } = req.params;
    
        const property = { ...req.body };
    
        if (isNaN(propertyId) || parseInt(propertyId) !== property.propertyId) {
            return res.sendStatus(400);
        }
    
        if ((await User.findOne({ where: { propertyId: propertyId } })) == null) {
            return res.sendStatus(404);
        }
    
        try {
            await User.update(property, { where: { propertyId: propertyId } });
    
            return res.sendStatus(204);
        }
        catch (err) {
            console.error(err);

            return res.status(500).json({ error: 'Ошибка сервера.' });
        }
    }
}

module.exports = new PropertyController();