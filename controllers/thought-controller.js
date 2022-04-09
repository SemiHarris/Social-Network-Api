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
              { _id: params.thoughtsId },
              { $pull: { comments: params.thoughtsId } },
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
      }
}

module.exports = thoughtController