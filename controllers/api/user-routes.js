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

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;
