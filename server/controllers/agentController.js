const { Agent, Speciality } = require('../models/models');
const { Op } = require('sequelize');

class AgentController {
    async getAgents(req, res) {
        try {
            const { specialityId } = req.query;

            const agents = await Agent.findAll({
                where: {
                  SpecialityId: specialityId !== '0' ? specialityId : { [Op.ne]: null },
                },
                include: { model: Speciality },
              });
    
            return res.json(agents);
        }
        catch (err) {
            console.error(err);

            return res.sendStatus(500).json({ error: 'Ошибка сервера.' });
        }
    }

    async createAgent(req, res) {
        try {
            const agent = { ...req.body };    
    
            const createdAgent = await Agent.create(agent);
    
            return res.status(201).json(createdAgent);
        }
        catch (err) {
            console.error(err);

            return res.status(500).json({ error: 'Ошибка сервера.' });
        }
    }
}

module.exports = new AgentController();