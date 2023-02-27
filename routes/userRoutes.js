const router = require("express").Router();
const getAllUsers = require("../controllers/userControllers/getAllUsers");
const getUserPost = require("../controllers/userControllers/getUserPost");
const updateUser = require("../controllers/userControllers/updateUser");
const changeProfilePicture = require("../controllers/userControllers/changeProfilePicture");
const removeProfilePicture = require("../controllers/userControllers/removeProfilePicture");
const changePassword = require("../controllers/userControllers/changePassword");

router.get("/", getAllUsers);
router.get("/:id", getUserPost);
router.patch("/", updateUser);
router.put("/change-profile/:id", changeProfilePicture);
router.delete("/remove-profile/:id", removeProfilePicture);
router.patch("/change-password/:id", changePassword);

module.exports = router;
