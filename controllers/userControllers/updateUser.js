const User = require("../../models/User");
const asyncHandler = require("express-async-handler");

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

module.exports = updateUser;
