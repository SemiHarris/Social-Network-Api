const {Thoughts, User} = require('../models');

const thoughtController = {

    addThought({ params, body }, res) {
        console.log(body);
        Thoughts.create(body)
          .then(({ _id }) => {
            
            return User.findOneAndUpdate(
                {_id: params.userId},
                { $push: { thoughts: _id } },
                { new: true}
            );
          })

          .then(dbUserData => {
              if (!dbUserData) {
                  res.status(404).json({ message: 'No user found with this id!' });

                  return;
              }

              res.json(dbUserData);
          })

          .catch(err => res.json(err))
      },

      removeThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.thoughtsId })
          .then(deletedthoughts => {
            if (!deletedthoughts) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { thoughts: params.thoughtsId } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },

      addReaction({ params, body }, res) {

        Thoughts.findOneAndUpdate(

          {_id: params.thoughtsId },
          { $push: {reactions: body}},
          { new: true }
        )
        .then(dbthoughtsData => {
          if (!dbthoughtsData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
          }

          res.json(dbthoughtsData)

        })

        .catch(err => res.json(err));
      },

      removeReaction({ params }, res) {

        Thoughts.findOneAndUpdate(
          {id: params.thoughtsId },
          { $pull: {reactions: { reactionId: params.reactionId }}},
          {new: true}
        )
          .then(dbthoughtsData => res.json(dbthoughtsData))
          .catch(err => res.json(err))
      }
}

module.exports = thoughtController