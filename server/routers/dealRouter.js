const { Router } = require("express");
const dealController = require("../controllers/dealController");

const router = new Router();

router.post("/create", dealController.createDeal);

module.exports = router;