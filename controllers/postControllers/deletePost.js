const Post = require("../../models/Post");
const asyncHandler = require("express-async-handler");
const { join } = require("path");
const baseName = require("../../baseName");
const fs = require("fs");

const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.query || {};

  //confirm data

  if (!id) {
    return res.status(400).json({ message: "Id not provided !" });
  }
  const selectedPost = await Post.findById(id);

  if (!selectedPost) {
    return res.status(400).json({ message: "Invalid post id !" });
  }

  if (selectedPost.image) {
    const imagePath = join(baseName, "public", selectedPost.image);
    // remove image from the server
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          return res
            .status(404)
            .json({ message: "Could not remove the image !" });
        }
      });
    }
  }

  console.log(selectedPost);

  const deletedPost = await selectedPost.delete();

  if (deletedPost) {
    return res.status(200).json({ message: "post deleted !" });
  }

  return res.status(500).json({ message: "Server error !" });
});

module.exports = deletePost;
