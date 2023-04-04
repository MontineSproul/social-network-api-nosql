const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // POST add Friend
addFriend({params}, res){
  User.findOneAndUpdate(
      {_id: params.userId},
      {$push: {friends: params.friendId}},
      {new: true, runValidators: true}
  )
  .then ((dataDb)=> {
      if(!dataDb){
          res.status(400).json({message: "No User with this Id"});
          return;
      }
      res.json(dataDb);
  })
  .catch((err)=> res.json(err));
},

// DELETE remove friend
removeFriend({params}, res){
  User.findOneAndUpdate(
      {_id: params.userId},
      {$pull: {friends: params.friendId}},
      {new: true, runValidators: true}
  )
  .then ((dataDb)=> {
      if(!dataDb){
          res.status(400).json({message: "No User with this Id"});
          return;
      }
      res.json(dataDb);
  })
  .catch((err)=> res.json(err));
},
};
