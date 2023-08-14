const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Post, Comment } = require('../models');

// Get all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: {
                exclude: ['password'],
            },
            order: [['name', 'ASC']],
        });
        const users = userData => res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;
