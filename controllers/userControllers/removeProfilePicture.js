const User = require("../../models/User");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const { join } = require("path");
const baseName = require("../../baseName");

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
    const imagePath = join(baseName, "public", user.profileImg);
    // remove image from the server
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          return res
            .status(404)
            .json({ message: "Could not remove the profile !" });
        }
      });
    }
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

module.exports = removeProfilePicture;
