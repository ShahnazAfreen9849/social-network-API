const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController.js');

// /api/users
// http://localhost:3001/api/users/
router.route('/').get(getUsers).post(createUser);

// /api/users/:courseId
//http://localhost:3001/api/users/649e3c58bba8e5521fef30ab
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
