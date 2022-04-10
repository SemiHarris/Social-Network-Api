const {Schema, model} = require('mongoose');

const UserSchema = new Schema({

    usernane: {
        type: String
    },

    email: {
        type: String
    },

    friends: [],

    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thoughts'
        }
      ]
},
{
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

UserSchema.virtual('thoughtCount').get(function() {
  return this.thoughts.reduce((total, thoughts) => total + thoughts.reactions.length + 1, 0);
  });

const User = model('User', UserSchema);

module.exports = User