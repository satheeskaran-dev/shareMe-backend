const router = require("express").Router();
const {
  getUserPost,
  updateUser,
  changePassword,
  removeProfilePicture,
  getAllUsers,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:id", getUserPost);
router.patch("/", updateUser);
router.delete("/remove-profile/:id", removeProfilePicture);
router.patch("/change-password/:id", changePassword);

module.exports = router;
