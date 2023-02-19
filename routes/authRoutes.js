const express = require("express");
const router = express.Router();
const { register, logIn, logOut } = require("../controllers/authController");
const { upload } = require("../middleware/uploader");

router.post("/sign-up", register);
router.post("/login", logIn);
router.post("/logout", logOut);

module.exports = router;
