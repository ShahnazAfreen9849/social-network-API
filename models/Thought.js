const { Schema, model } = require('mongoose');
import reactionSchema   from './Reaction';

// Schema to create a course model  
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
      get: (date) => date.toLocaleDateString(),
    },

    username: {
      type: String,
      required: true,
    },

    reactions: [reactionSchema],
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  }) 



const Thought = model('thought', thoughtSchema);

module.exports = Thought;
