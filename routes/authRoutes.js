const express = require("express");
const router = express.Router();
const register = require("../controllers/authControllers/register");
const logIn = require("../controllers/authControllers/logIn");
const logOut = require("../controllers/authControllers/logOut");

router.post("/sign-up", register);
router.post("/login", logIn);
router.post("/logout", logOut);

module.exports = router;
