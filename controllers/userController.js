const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const fs = require("fs");

const getAllUsers = asyncHandler(async (req, res) => {
  const user = await User.find().select("-password").sort({ createdAt: -1 });
  if (!user) {
    return res.status(404).json({ message: "No users exists !" });
  }
  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.query;
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

      if (updatedUser) {
        return res
          .status(200)
          .json({ status: 200, message: "Profile picture deleted ." });
      } else {
        return res.status(500).json({
          message: "server error",
        });
      }
    });
  } else {
    res
      .status(400)
      .json({ status: 400, message: "Profile picture does not exists !" });
  }
});

const getUserPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) {
    return res.status(404).json({ message: "user id not provided !" });
  }
  const userPost = await User.findById(id)
    .populate({ path: "posts", options: { sort: "-createdAt" } })
    .select("posts");

  if (!userPost) {
    return res.status(404).json({ message: "No posts exists !" });
  }
  res.status(200).json(userPost);
});

module.exports = {
  getAllUsers,
  getUserPost,
  updateUser,
  changePassword,
  removeProfilePicture,
};
