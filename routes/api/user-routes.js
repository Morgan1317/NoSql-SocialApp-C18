const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addNewFriend,
  removeFriend
} = require('../../controllers/user-controller');
const { remove } = require('../../models/User');

// /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// router
//   .route('/:id/friends/')
//   .post(addNewFriend)
//   .delete(removeFriend);

module.exports = router;