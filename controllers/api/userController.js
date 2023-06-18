const express = require('express');
const router = express.Router();
const { User } = require('../../models');

// Route to retrieve all user data
router.get("/", async (_, res) => {
    try {
        // Retrieve user data from the database without password
        const userData = await User.findAll({
            attributes: { exclude: ["password"] },
        });

        // Send the data
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to create a new user
router.post('/', async (req, res) => {
    try {
        // Create a new user with the provided request body data
        const userData = await User.create(req.body);

        // Save the user's session data and send the created user as a JSON response
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to handle user login
router.post('/login', async (req, res) => {
    try {
        // Find user in the database based on the provided username
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            // If no user is found
            res.status(400).json({ message: 'Incorrect email or password.' });
            return;
        }

        // Check if the provided password matches the user's stored password
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            // If the password is invalid
            res.status(400).json({ message: 'Incorrect email or password.' });
            return;
        }

        // Save the user's session data 
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Login successful.' });
        });
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

// Route to handle user logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        // Destroy the user's session 
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        // If the user is not logged in, respond with a "Not Found" status code
        res.status(404).end();
    }
});

module.exports = router;
