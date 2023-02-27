const User = require("../../models/User");
const asyncHandler = require("express-async-handler");

const getAllUsers = asyncHandler(async (req, res) => {
  const user = await User.find().select("-password").sort({ createdAt: -1 });
  if (!user) {
    return res.status(404).json({ message: "No users exists !" });
  }
  res.status(200).json(user);
});

module.exports = getAllUsers;
