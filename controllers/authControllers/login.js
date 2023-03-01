const User = require("../../models/User");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "All fields are required" });
  }

  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return res.status(400).json({ message: "Invalid credentials !" });
  }
  const isMatch = await bcrypt.compare(password, foundUser.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Incorrect password! " });
  }

  const accessToken = jwt.sign(
    { id: foundUser._id, email: foundUser.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "2m" }
  );
  const accessTokenExpireAt = Math.floor(Date.now() / 1000) + 60 * 2;

  const refreshToken = jwt.sign(
    { email: foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  res.cookie("jwt", refreshToken, {
    httpOnly: true, // accessible only by web server
    secure: true, //https
    sameSite: "none", // cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expire after 7 days
  });

  // remove password from response object
  delete foundUser["password"];

  res.status(200).json({
    token: accessToken,
    expireAt: accessTokenExpireAt,
    user: foundUser,
  });
});

module.exports = login;
