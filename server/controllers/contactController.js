const { Contact, ContactType } = require('../models/models');

class ContactController {
    async getAll(req, res) {
        try {
            const contacts = await Contact.findAll({ include: ContactType });

            return res.json(contacts);
        }
        catch (err) {
            console.log(err);

            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
}

module.exports = new ContactController();