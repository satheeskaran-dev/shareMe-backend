const router = require("express").Router();
const {
  getUser,
  updateUser,
  changePassword,
  removeProfilePicture,
} = require("../controllers/userController");

// router.get("/:id", getUser);
router.get("/", getUser);
router.patch("/:id", updateUser);
router.delete("/remove-profile/:id", removeProfilePicture);
router.patch("/change-password/:id", changePassword);

module.exports = router;
