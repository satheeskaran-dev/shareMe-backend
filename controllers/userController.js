const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const fs = require("fs");

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json({ message: "user id not provided !" });
  }
  const user = await User.findById(id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "No such user exists !" });
  }

  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!id) {
    return res.status(400).json({ message: "Id is not provided !" });
  }

  if (data.password) {
    delete data.password;
  }

  const user = await User.findByIdAndUpdate(id, data, { new: true });
  if (!user) {
    return res.status(400).json({ message: "User does not exists !" });
  }

  res.status(200).json(user);
});

const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Id is not provided !" });
  }

  if (!newPassword || !currentPassword) {
    return res.status(400).json({ message: "All field are required !" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User does not exists !" });
  }
  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ message: "Your current password is incorrect !" });
  }
  const salt = await bcrypt.genSalt();

  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;

  const updatedUser = await user.save();

  if (updatedUser)
    res.status(200).json({ message: "password changed successfully !" });
});

const removeProfilePicture = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log("id is here", id);

  if (!id) {
    return res.status(404).json({ message: "user id not provided !" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ message: "User does not exists !" });
  }
  if (user.profileImg) {
    fs.unlink(`public/${user.profileImg}`, async (err) => {
      if (err) {
        return res.status(500).json({
          message: "Could not delete the file. " + err,
        });
      }

      user.profileImg = "";

      const updatedUser = await user.save();

      if (updateUser) {
        res
          .status(200)
          .json({ message: "Profile picture deleted .", user: updatedUser });
      } else {
        return res.status(500).json({
          message: "server error",
        });
      }
    });
  }
});

module.exports = { getUser, updateUser, changePassword, removeProfilePicture };
