const router = require("express").Router();
const {
  getUser,
  updateUser,
  changePassword,
} = require("../controllers/userController");

router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.patch("/change-password/:id", changePassword);

module.exports = router;
