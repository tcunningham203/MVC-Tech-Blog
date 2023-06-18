const express = require('express');
const router = express.Router();
const postRoutes = require('./postController');
const userRoutes = require('./userController');
const commentRoutes = require('./commentController');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
