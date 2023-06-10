const router = require('express').Router();
const { Note } = require('../../models');
const withAuth = require('../../utils/auth');
  
// Create a new note for a castle
router.post('/:castleId', withAuth, async (req, res) => {
  try {
    const castleId = req.params.castleId;
    const userId = req.session.user_id;
    const { content } = req.body;

    const newNote = await Note.create({
      content,
      castle_id: castleId,
      user_id: userId,
    });

    res.status(200).json(newNote);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
  
// Delete a note by ID
router.delete('/:id', async (req, res) => {

  try {
    const noteData = await Note.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!noteData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(noteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;