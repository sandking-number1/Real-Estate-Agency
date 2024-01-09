const { Router } = require("express");
const userController = require("../controllers/userController");

const router = new Router();

router.get("/user", userController.getOne);
router.put("/update/:id", userController.update);

module.exports = router;