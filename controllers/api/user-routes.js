const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User, Post, Comment } = require('../../models');

// Get all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: {
                exclude: ['password'],
            },
            order: [['name', 'ASC']],
        });
        res.json(userData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Get single user by id
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'post_text',
                        'created_at',
                    ]
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'created_at'
                    ]
                }
            ],
        });

        if (!userData) {
            res.status(404).json({ message: 'No User found with this id.' });
            return;
        }
        res.json(userData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Create new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json(userData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!userData) {
            res.status(400).json({ message: 'Username not Found' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect Password' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json({
                user: userData,
                message: 'You are now logged in!',
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Update user by id
router.put('/:id', async (req, res) => {
    try {
        const userData = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        });
        if (!userData[0]) {
            res.status(404).json({ message: 'No User found with this id.' });
            return;
        }
        res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    };
});

// Delete user by id
router.delete('/:id', async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!userData) {
            res.status(404).json({ message: 'No User found with this id.' });
            return;
        }
        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

module.exports = router;
