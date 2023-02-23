const User = require("../models/User");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const expressFileUploader = require("../middleware/expressUploader");

/* REGISTER USER */

const register = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    location,
    gender,
    status,
    school,
    college,
    university,
    work,
    companyName,
    wordPlace,
    email,
    password,
  } = req.body;

  const { profileImg } = req.files || {};

  //confirm data

  if (!firstName || !lastName || !dateOfBirth || !email || !password) {
    return res.status(400).json({ message: "All field are required !" });
  }

  //check for duplicate

  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate) {
    return res
      .status(400)
      .json({ message: "User Already Exist. Please Login" });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const uploadPath = await expressFileUploader(profileImg, "dummy");

  if (profileImg && uploadPath === "")
    return res.status(400).json({ message: "file upload failed" });

  const newUser = new User({
    firstName,
    lastName,
    dateOfBirth,
    location,
    gender,
    status,
    school,
    college,
    university,
    work,
    companyName,
    wordPlace,
    email,
    password: hashedPassword,
    profileImg: uploadPath,
  });

  const savedUser = await newUser.save();

  if (savedUser) {
    return res.status(201).json({
      status: 201,
      message: ` New user ${savedUser.email} created successfully`,
    });
  } else {
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error !" });
  }
});

const logIn = asyncHandler(async (req, res) => {
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

const logOut = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.sendStatus(204);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.json({ message: "cookie cleared" });
});

module.exports = { register, logIn, logOut };
