const express = require('express');
const router = express.Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get("/", async (_, res) => {
  try {
    const postData = await Post.findAll();
    res.json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const postData = {
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id
    };

    // Create new post in the database
    const newPost = await Post.create(postData);
    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a post by its id
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    res.json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update a post by its id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        }
      }
    );

    if (!updatePost[0]) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.status(200).json({ message: 'Post updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a post by its id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });

    if (!deletedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
