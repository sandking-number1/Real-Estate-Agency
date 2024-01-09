const { Router } = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const adminController = require("../controllers/adminController");

router.get("/user", userController.getProfile);
router.get("/admin", adminController.getProfile);

router.get("/all-users", userController.getAll);
router.put("/user/update/:id", userController.update);

router.get("/admins", adminController.getAll);

module.exports = router;