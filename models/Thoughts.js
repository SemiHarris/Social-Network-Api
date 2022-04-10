const dateFormat = require('../utils/dateFormat');
const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment's _id field
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String
      },
      username: {
        type: String
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      }
    },
    {
        toJSON: {
          getters: true
        }
      }
  );

const ThoughtsSchema = new Schema({

    thoughtText: {
        type: String
    },

    createAt: {
        type: Date,
        default: Date.now
    },

    username: {
        type: String
    },

    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
  }
);

ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts