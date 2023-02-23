const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const expressFileUploader = require("../middleware/expressUploader");

const createPost = asyncHandler(async (req, res) => {
  const { description } = req.body || {};
  const { userId } = req.query || {};

  const { image } = req.files || {};

  //confirm data

  if (!description && !image) {
    return res.status(400).json({ message: "All field are required !" });
  }
  const uploadPath = await expressFileUploader(image, "post");

  if (image && uploadPath === "")
    return res.status(400).json({ message: "file upload failed" });

  const newPost = new Post({
    user: userId,
    description,
    image: uploadPath,
  });

  const savedPost = await newPost.save();

  if (savedPost) {
    // push post id inside user collection

    await User.findByIdAndUpdate(
      userId,
      { $push: { posts: savedPost._id } },
      { new: true, useFindAndModify: false }
    );

    return res.status(201).json({
      status: 201,
      message: ` New post created successfully`,
      post: savedPost,
    });
  } else {
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error !" });
  }
});

const getAllPost = asyncHandler(async (req, res) => {
  const post = await Post.find();
  if (!post) {
    return res.status(404).json({ message: "No posts exists !" });
  }
  res.status(200).json(post);
});

module.exports = { createPost, getAllPost };
