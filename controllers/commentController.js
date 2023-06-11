const express = require('express');
const router = express.Router();
const { Comment, User } = require('../db/models');

// Create a new comment
router.post('/comment', async (req, res) => {
  try {
    const { content, postId } = req.body;

    // Get the logged-in user's ID from the session
    const userId = req.session.userId;

    if (!userId) {
      res.status(401).json({ message: 'You must be logged in to leave a comment' });
      return;
    }

    const comment = await Comment.create({ content, postId, userId });

    // Fetch the associated user for the comment
    const user = await User.findByPk(userId, { attributes: ['username'] });

    res.status(201).json({ comment, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a comment
router.delete('/comment/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    // Get the logged-in user's ID from the session
    const userId = req.session.userId;

    if (comment.userId !== userId) {
      res.status(403).json({ message: 'You are not authorized to delete this comment' });
      return;
    }

    await comment.destroy();

    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
