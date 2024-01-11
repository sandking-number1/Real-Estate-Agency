const Router = require('express')
const router = new Router()
const authRouter = require('./authRouter')
const propertyRouter = require('./propertyRouter')
const profileRouter = require('./profileRouter')
const protectedRouter = require("./protectedRouter");
const reviewRouter = require("./reviewRouter");
const contactRouter = require("./contactRouter");
const authMiddleware = require("../middleware/authMiddleware");

router.use('/auth', authRouter)
router.use('/properties', propertyRouter)
router.use('/profile', profileRouter)
router.use('/reviews', reviewRouter)
router.use('/contacts', contactRouter);
router.use("/api", authMiddleware, protectedRouter);

module.exports = router