

const User = require("../../models/User");
const asyncHandler = require("express-async-handler");


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

module.exports = getUserPost
