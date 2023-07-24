const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/ThoughtController');

// /api/Thought
router.route('/').get(getThought).post(createThought);

// /api/Thought/:ThoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reaction
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thought/:thoughtId/assignments/:reactionId
router.route('/:thoughtId/reactions/:reactionsId').delete(removeReaction);

module.exports = router;
