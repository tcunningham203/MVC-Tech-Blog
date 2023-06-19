const router = require('express').Router();
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
router.post('/:post_id', async (req, res) => {
  try {
    const newComment = await Comment.create({
      post_id: req.params.post_id,
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;