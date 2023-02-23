const router = require("express").Router();
const {
  getUserPost,
  updateUser,
  changePassword,
  removeProfilePicture,
  getAllUsers,
  changeProfilePicture,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:id", getUserPost);
router.patch("/", updateUser);
router.patch("/change-profile/:id", changeProfilePicture);
router.delete("/remove-profile/:id", removeProfilePicture);
router.patch("/change-password/:id", changePassword);

module.exports = router;
