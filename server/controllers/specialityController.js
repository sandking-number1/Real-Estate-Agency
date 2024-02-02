const { Speciality } = require('../models/models');

class SpecialityController {
    async getAll(req, res) {
        try {
            const specialities = await Speciality.findAll();
    
            return res.json(specialities);
        }
        catch (err) {
            console.error(err);

            return res.sendStatus(500).json({ error: 'Ошибка сервера.' });
        }
    }
}

module.exports = new SpecialityController();