const { Router } = require("express");
const contactController = require("../controllers/contactController");

const router = new Router();

router.get("", contactController.getAll);

module.exports = router;