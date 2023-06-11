const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    await User.create({ username, password: hashedPassword });

    // Redirect to the login page
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ where: { username } });

    if (!user) {
      // User not found, redirect to the signup page
      return res.redirect('/signup');
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Invalid password, redirect to the login page
      return res.redirect('/login');
    }

    // Set the user ID in the session
    req.session.userId = user.id;

    // Redirect to the dashboard
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  // Destroy the session and redirect to the homepage
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
