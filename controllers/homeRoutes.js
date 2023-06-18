const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Homepage route
router.get('/', async (req, res) => {
  try {
    // Fetch all blog posts from the database
    const postFetch = await Post.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }
      ],
      order: [['createdAt', 'DESC']]
    });
    const posts = postFetch.map((post) => post.get({ plain: true }));
    // Render the homepage 
    res.render("home", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.get('/login', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/dashboard'); // Redirect to dashboard if logged in
      return;
    }
    res.render("login"); // Render login screen
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// Signup route
router.get('/signup', async (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect('/dashboard'); // Redirect to dashboard if logged in
      return;
    }
    res.render("signup"); // Render signup screen
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// Dashboard route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Fetch posts 
    const dashData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    const posts = dashData.get({ plain: true });
    // Render dashboard view 
    res.render('dashboard', { ...posts, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create post route
router.get('/create-post', async (req, res) => {
  try {
    const makePost = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']]
    });

    const posts = makePost.get({ plain: true });

    res.render("create-post", { ...posts, logged_in: req.session.logged_in });
  } catch {
    res.status(500).json(err);
    console.log(err);
  }
});

// Update post route
router.get('/update-post/:id', async (req, res) => {
  try {
    const updatePost = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['id'] }],
    });

    const posts = updatePost.get({ plain: true });

    res.render("update-post", { ...posts, logged_in: req.session.logged_in });
  } catch {
    res.status(500).json(err);
    console.log(err);
  }
});

// Single post route
router.get('/post/:id', async (req, res) => {
  try {
    const posts = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }
      ]
    });

    const post = posts.get({ plain: true });
    // Render single-post view 
    res.render('single-post', { ...post, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add comment route
router.get('/add-comment/:id', withAuth, async (req, res) => {
  try {
    // Fetch the post by ID 
    const userData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] }
      ]
    });
    const posts = userData.get({ plain: true });
    // Render add-comment view
    res.render('add-comment', { ...posts, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
