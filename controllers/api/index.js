const router = require('express').Router();
const postRoutes = require('./postController');
const dashboardRoutes = require('./dashboardController');
const commentRoutes = require('./commentController');

router.use('/posts', postRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
