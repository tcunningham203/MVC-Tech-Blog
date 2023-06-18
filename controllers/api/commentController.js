const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');

// Get all comments
router.get("/", async (_, res) => {
  try {
    // Retrieve all comments from the database
    const commentData = await Comment.findAll();

    // Send the comment data
    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get a specific comment by ID
router.get("/:id", async (req, res) => {
  try {
    // Find a comment in the database 
    const commentData = await Comment.findByPk(req.params.id);

    // Send the data
    res.json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new comment
router.post('/comment/:id', async (req, res) => {
  try {
    const { content, postId } = req.body;

    // Get the logged-in user's ID 
    const userId = req.session.userId;

    if (!userId) {
      // If the user is not logged in
      res.status(401).json({ message: 'You must be logged in to leave a comment' });
      return;
    }

    // Create a new comment with the provided content, postId, and userId
    const comment = await Comment.create({ content, postId, userId });

    // Fetch the user for the comment
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

    // Find the comment 
    const comment = await Comment.findByPk(id);

    if (!comment) {
      // If not found
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    // Get the logged-in user's ID
    const userId = req.session.userId;

    if (comment.userId !== userId) {
      // If the logged-in user is not the author of the comment
      res.status(403).json({ message: 'You are not authorized to delete this comment' });
      return;
    }

    // Delete the comment 
    await comment.destroy();

  
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
