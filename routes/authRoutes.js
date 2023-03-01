const express = require("express");
const router = express.Router();
const register = require("../controllers/authControllers/register");
const login = require("../controllers/authControllers/login");
const logout = require("../controllers/authControllers/logout");

router.post("/sign-up", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
