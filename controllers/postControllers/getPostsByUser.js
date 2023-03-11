const Post = require("../../models/Post");
const asyncHandler = require("express-async-handler");

const getPostsByUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log("id =>", id);

  if (!id) {
    return res.status(400).json({ message: "Id not provided !" });
  }

  const post = await Post.find({ user: id })
    .populate({
      path: "user",
      select: "firstName lastName profileImg",
    })
    .sort({ createdAt: -1 });

  if (!post) {
    return res.status(404).json({ message: "No posts exists !" });
  }
  res
    .status(200)
    .json({ message: `user's post retrieve successfully ! `, data: post });
});

module.exports = getPostsByUser;
