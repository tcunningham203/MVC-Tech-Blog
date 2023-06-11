const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../db/models');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']],
    });

    res.render('homepage', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a single post by ID
router.get('/post/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] },
      ],
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.render('single-post', { post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new post
router.post('/post', async (req, res) => {
  try {
    const { title, content } = req.body;

    // Get the logged-in user's ID from the session
    const userId = req.session.userId;

    if (!userId) {
      res.status(401).json({ message: 'You must be logged in to create a post' });
      return;
    }

    const post = await Post.create({ title, content, userId });

    res.redirect(`/post/${post.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a post
router.put('/post/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findByPk(id);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // Get the logged-in user's ID from the session
    const userId = req.session.userId;

    if (post.userId !== userId) {
      res.status(403).json({ message: 'You are not authorized to update this post' });
      return;
    }

    await post.update({ title, content });

    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a post
router.delete('/post/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    // Get the logged-in user's ID from the session
    const userId = req.session.userId;

    if (post.userId !== userId) {
      res.status(403).json({ message: 'You are not authorized to delete this post' });
      return;
    }

    await post.destroy();

    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
