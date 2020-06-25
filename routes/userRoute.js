const express = require("express");
const userController = require("./../controllers/userController");

const {
  getUsers,
  createUser,
  userLogin,
  deleteUser,
  updateUser,
  oneUser
} = userController;
const router = express.Router();

router
  .route("/")
  .get(getUsers)
  .post(createUser)
  .patch(updateUser)
  .delete(deleteUser);

router.route("/login").post(userLogin);

router.route('/oneUser').get(oneUser)

module.exports = router;
