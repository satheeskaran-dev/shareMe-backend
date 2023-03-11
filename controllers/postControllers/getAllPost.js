const Post = require("../../models/Post");
const asyncHandler = require("express-async-handler");

const getAllPost = asyncHandler(async (req, res) => {
  const post = await Post.find()
    .populate({
      path: "user",
      select: "firstName lastName profileImg",
    })
    .sort({ createdAt: -1 });
  if (!post) {
    return res.status(404).json({ message: "No posts exists !" });
  }

  res.status(200).json(post);
});

module.exports = getAllPost;
