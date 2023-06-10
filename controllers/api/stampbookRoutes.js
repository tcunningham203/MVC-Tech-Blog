const router = require("express").Router();
const { Stamp, Castle } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const stampData = await Stamp.findAll({
      include: [{ model: Castle, attributes: ["stamppic"] }],
    });
    res.status(200).json(stampData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user", withAuth, async (req, res) => {
  try {
    console.log(req.params.id);
    const stampData = await Stamp.findAll({
      where: { user_id: req.session.user_id },
    });
    res.status(200).json(stampData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create stamp entry for user
router.post("/", withAuth, async (req, res) => {
  try {
    const stampData = await Stamp.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(stampData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete stamp entry for user
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const stampData = await Stamp.destroy({
      where: {
        castle_id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(stampData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
