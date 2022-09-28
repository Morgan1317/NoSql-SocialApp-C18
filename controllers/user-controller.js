const { User, Thought } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get a single user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // post a new user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update (put) a user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true
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

  // delete user based on id 
  deleteUser( req, res) {
      User.findOneAndDelete({ _id: req.params.id },)
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        // maybe how to delete associated thoughts
        // Thought.deleteMany({ _id: { $in: user.thoughts } })
      })
      .then(() => res.json({ message: 'User deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // add friend via users id
  addNewFriend({ params }, res) {
    User.findOneAndUpdate(
    
      { _id: params.id },
      { $addToSet: { friends: params.friendId } },
      {
        runValidators: true,
        new: true
      },
    )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
      .catch(err => res.json(err));
  },
  removeFriend({params}, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId }},
      {
        runValidators: true,
        new: true
      }
    )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
      .catch(err => res.json(err));
  },

};

module.exports = userController;
