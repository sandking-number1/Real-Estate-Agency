const { Router } = require("express");
const dealController = require("../controllers/dealController");

const router = new Router();

router.post("/create", dealController.createDeal);
router.get("/closed", dealController.getClosedDeals);
router.get("/opened", dealController.getOpenedDeals);
router.get("/user/:userId", dealController.getDealsOfUser);
router.get("/user/completed/:userId", dealController.getCompletedDealsOfUser);
router.post("/close/:id", dealController.close);
router.post("/sell/:id", dealController.sell);

module.exports = router;