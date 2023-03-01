const express = require("express");
const router = express.Router();
const register = require("../controllers/authControllers/register");
const login = require("../controllers/authControllers/login");
const logOut = require("../controllers/authControllers/login");

router.post("/sign-up", register);
router.post("/login", login);
router.post("/login", login);

module.exports = router;
