const express = require('express');
const router = express.Router();

// Import the models
const { Post, User, Comment } = require('../db/models');

// Homepage route
router.get('/', async (req, res) => {
  try {
    // Fetch all blog posts from the database
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Render the homepage view with the fetched blog posts
    res.render('home', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Other routes related to the homepage
// ...

module.exports = router;
