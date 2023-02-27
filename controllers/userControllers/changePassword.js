const User = require("../../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

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

module.exports = changePassword;
