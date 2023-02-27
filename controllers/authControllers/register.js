const User = require("../../models/User");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const expressFileUploader = require("../../middleware/expressUploader");

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

  const uploadPath = await expressFileUploader(profileImg, "userProfileImage");

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

module.exports = register;
