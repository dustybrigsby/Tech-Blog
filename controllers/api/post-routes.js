const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { User, Post, Comment } = require('../../models');

// Get all posts
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: [
                'id',
                'title',
                'post_text',
                'created_at',
            ],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at',
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
            ],
            order: [['created_at', 'DESC']],
        });
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get single post by id
router.get('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'post_text',
                'created_at',
            ],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text',
                        'post_id',
                        'user_id',
                        'created_at',
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
            ],
        });

        if (!postData) {
            res.status(404).json({ message: 'No Post found with this id.' });
            return;
        }
        res.json(postData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Create new post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            post_text: req.body.post_text,
            user_id: req.session.user_id
        });
        res.json(postData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Update post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                post_text: req.body.post_text,
            },
            {
                where: {
                    id: req.params.id,
                }
            });
        if (!postData) {
            res.status(400).json({ message: 'Post not Found.' });
            return;
        }
        res.json(postData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

// Delete post by id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!postData) {
            res.status(404).json({ message: 'No Post found with this id.' });
            return;
        }
        res.json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

module.exports = router;
