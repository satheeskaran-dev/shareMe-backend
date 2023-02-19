const router = require("express").Router();
const {
  getUser,
  updateUser,
  changePassword,
  removeProfilePicture,
  getAllUsers,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.patch("/", updateUser);
router.delete("/remove-profile/:id", removeProfilePicture);
router.patch("/change-password/:id", changePassword);

module.exports = router;
