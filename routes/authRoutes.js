const express = require("express");
const router = express.Router();
const register = require("../controllers/authControllers/register");
const login = require("../controllers/authControllers/logIn");
const logout = require("../controllers/authControllers/logOut");

router.post("/sign-up", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
