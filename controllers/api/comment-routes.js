const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        res.json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
        console.log(commentData);
        res.json(commentData);

    } catch (err) {
        // console.log(err);
        res.status(500).json(err);
    };
});

// Delete comment by id
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id.' });
            return;
        }
        res.json(commentData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    };
});

module.exports = router;
