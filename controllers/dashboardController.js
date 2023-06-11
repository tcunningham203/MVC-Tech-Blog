const express = require('express');
const router = express.Router();
const { Post, User } = require('../db/models');

// Dashboard route
router.get('/dashboard', async (req, res) => {
  try {
    // Get the user ID from the session
    const userId = req.session.userId;

    if (!userId) {
      // User is not logged in, redirect to the login page
      return res.redirect('/login');
    }

    // Find the user in the database
    const user = await User.findByPk(userId, {
      include: [{ model: Post, as: 'posts' }],
    });

    // Render the dashboard view with the user's posts
    res.render('dashboard', { user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create post route
router.post('/posts', async (req, res) => {
  try {
    // Get the user ID from the session
    const userId = req.session.userId;

    if (!userId) {
      // User is not logged in, redirect to the login page
      return res.redirect('/login');
    }

    const { title, content } = req.body;

    // Create a new post for the user
    await Post.create({ title, content, userId });

    // Redirect to the dashboard
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update post route
router.put('/posts/:id', async (req, res) => {
  try {
    // Get the user ID from the session
    const userId = req.session.userId;

    if (!userId) {
      // User is not logged in, redirect to the login page
      return res.redirect('/login');
    }

    const postId = req.params.id;
    const { title, content } = req.body;

    // Find the post by ID
    const post = await Post.findByPk(postId);

    if (!post) {
      // Post not found, redirect to the dashboard
      return res.redirect('/dashboard');
    }

    // Check if the post belongs to the logged-in user
    if (post.userId !== userId) {
      // User is not authorized to update the post, redirect to the dashboard
      return res.redirect('/dashboard');
    }

    // Update the post
    await post.update({ title, content });

    // Redirect to the dashboard
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete post route
router.delete('/posts/:id', async (req, res) => {
  try {
    // Get the user ID from the session
    const userId = req.session.userId;

    if (!userId) {
      // User is not logged in, redirect to the login page
      return res.redirect('/login');
    }

    const postId = req.params.id;

    // Find the post by ID
    const post = await Post.findByPk(postId);

    if (!post) {
      // Post not found, redirect to the dashboard
      return res.redirect('/dashboard');
    }

    // Check if the post belongs to the logged-in user
    if (post.userId !== userId) {
      // User is not authorized to delete the post, redirect to the dashboard
      return res.redirect('/dashboard');
    }

    // Delete the post
    await post.destroy();

    // Redirect to the dashboard
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
