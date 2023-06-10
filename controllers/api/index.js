const router = require("express").Router();
const userRoutes = require("./userRoutes");
const stampRoutes = require("./stampbookRoutes");
const reviewRoutes = require('./review-routes');
const noteRoutes = require('./noteRoutes');

router.use("/users", userRoutes);
router.use("/stamps", stampRoutes);
router.use("/review", reviewRoutes);
router.use('/notes', noteRoutes);

module.exports = router;