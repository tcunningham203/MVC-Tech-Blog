const router = require("express").Router();
const { User, Castle, Stamp, Review, Note } = require("../models");
// withAuth prevents access to pages when not logged in
// used in all home routes besides login
const withAuth = require("../utils/auth");
const castleRegions = require("../source/constants");

router.get("/", withAuth, async (req, res) => {
  try {
    // get all source data for castle regions
    const regions = castleRegions;
    
    // pass data and session flag into template
    res.render("map", {
      regions,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // if user is logged in, redirect to homepage (map page)
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/stampbook", withAuth, async (req, res) => {
  try {
    // find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    const user = userData.get({ plain: true });

    res.render("stamps", {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/castle/:id", withAuth, async (req, res) => {
  try {
    // find castle by id and JOIN with note data which is joined with user data
    const castleData = await Castle.findByPk(req.params.id,{
      include: [
        {
          model: Note,
          attributes: ["id", "content", "createdAt"],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });

    const castle = castleData.get({ plain: true });

    res.render("castle", {
      ...castle,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // get all reviews and JOIN with user data
    const dbReviewData = await Review.findAll({
      include: {
        model: User,
        attributes: ['name']
    },
    // specifies ordering by id column
      order: [['id', 'DESC']],
    });
    const reviews = dbReviewData.map((review) => review.get({ plain: true }));
    res.render("dashboard", {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
