const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Dashboard route
router.get('/', withAuth, async (req, res) => {
  try {
    // Fetch all blog posts created by the logged-in user
    const posts = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']]
    });

    // Render the dashboard view with the fetched blog posts
    res.render('dashboard', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
