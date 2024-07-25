const User = require('../models/User');

module.exports = (app) => {
    // Register a new user
    app.post('/api/users/register', async (req, res) => {
        try {
            const user = new User(req.body);
            await user.save();
            res.json(user);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    // Login (authentication should be added here)
    app.post('/api/users/login', async (req, res) => {
        try {
            const user = await User.findOne(req.body);
            if (user) {
                res.json(user);
            } else {
                res.status(401).send('Invalid credentials');
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    });
};
