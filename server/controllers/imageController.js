const { Image } = require('../models/models');

class ImageController {
    async getPropertyImages(req, res) {
        try {
            const { propertyId } = req.params;

            const images = await Image.findAll({
                where: { propertyId: propertyId }
            });
    
            return res.json(images);
        }
        catch (err) {
            console.error(err);

            return res.sendStatus(500).json({ error: 'Ошибка сервера.' });
        }
    }

    async createPropertyImage(req, res) {
        try {
            const { image } = req.params;

            const createdImage = await Image.create(image);
    
            return res.status(201).json(createdImage);
        }
        catch (err) {
            console.error(err);

            return res.status(500).json({ error: 'Ошибка сервера.' });
        }
    }
}

module.exports = new ImageController();