const express = require("express");
const { register, logIn, logOut } = require("../controllers/authController");
const router = express.Router();
const { upload } = require("../middleware/uploader");

router.post("/sign-up", upload.single("profileImg"), register);
router.post("/login", logIn);
router.post("/logout", logOut);

module.exports = router;
