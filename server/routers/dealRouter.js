const { Router } = require("express");
const dealController = require("../controllers/dealController");

const router = new Router();

router.post("/create", dealController.createDeal);
router.get("/user/:userId", dealController.getDealsOfUser);
router.get("/user/completed/:userId", dealController.getCompletedDealsOfUser);

module.exports = router;