
const { Thought, User} = require('../models');

module.exports = {
  // Get all thoughts
  async getThought(req, res) {
    try {
      const thought = await Thought.find();

      const thoughtObj = {
        thoughts,
        headCount: await headCount(),
      };

      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }

      res.json({
        thought,
        grade: await grade(req.params.thoughtId),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought and remove them from the course
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }

      const Thought = await Thought.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'Thought deleted, but no thought found',
        });
      }

      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an reaction to a student
  async addReaction(req, res) {
    console.log('You are adding an reaction');
    console.log(req.body);

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove assignment from a student
  async removeReactions(req, res) {
    try {
      const reaction = await Reaction.findOneAndUpdate(
        { _id: req.params.reactionId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: 'No reaction found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
