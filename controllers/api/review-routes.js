const router = require('express').Router();
const { Review } = require('../../models');
const withAuth = require('../../utils/auth');

// create review for our site
router.post('/', withAuth, async (req, res) => {

    try {
        const dbReviewData = await Review.create({
            user_name: req.body.user_name,
            review_text: req.body.review_text,
            star_rating: req.body.star_rating,
            user_id: req.session.user_id
        })
        console.log(dbReviewData);
        res.json(dbReviewData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;