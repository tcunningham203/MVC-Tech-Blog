const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

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


router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Fetch the user's posts from the database
    const posts = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']]
    });

    // Render the dashboard view with the user's posts
    res.render('dashboard', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/post/:id', async (req, res) => {
  try {
    // Fetch the post by its ID from the database
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }
      ]
    });

    // Render the single-post view with the fetched post
    res.render('single-post', { post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
