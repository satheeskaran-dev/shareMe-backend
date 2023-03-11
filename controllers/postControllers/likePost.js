const Post = require("../../models/Post");
const asyncHandler = require("express-async-handler");
const User = require("../../models/User");

const likePost = asyncHandler(async (req, res) => {
  const { postId, userId, isLiked } = req.body || {};

  //confirm data

  if (!postId && !userId) {
    return res.status(400).json({ message: "All field are required !" });
  }

  const selectedPost = await Post.findById(postId);

  if (!selectedPost) {
    return res.status(404).json({ message: "No posts exists !" });
  }

  const isAlreadyLiked = selectedPost.likes.includes(userId);

  if (isAlreadyLiked) {
    const updatedLikesArray = selectedPost.likes.filter((id) => id !== userId);
    selectedPost.likes = updatedLikesArray;
  } else {
    selectedPost.likes.push(userId);
  }

  const updatedPost = await selectedPost.save();

  res.status(200).json({ message: "post liked", post: updatedPost });
});

module.exports = likePost;
