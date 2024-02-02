const Router = require('express');
const router = new Router();
const agentController = require('../controllers/agentController');
const specialityController = require('../controllers/specialityController');

router.get('', agentController.getAgents);
router.get('/specialities', specialityController.getAll);
router.post('/create', agentController.createAgent);

module.exports = router;