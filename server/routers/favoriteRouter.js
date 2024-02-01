const { Router } = require("express");
const favoriteController = require("../controllers/favoriteController");

const router = new Router();

router.post("/create", favoriteController.createFavorite);
router.get("/user/:userId", favoriteController.getFavoritesOfUser);
router.post("/delete", favoriteController.deleteFavorite);

module.exports = router;