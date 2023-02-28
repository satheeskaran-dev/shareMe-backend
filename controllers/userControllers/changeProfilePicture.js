const User = require("../../models/User");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const { join } = require("path");
const baseName = require("../../baseName");
const expressFileUploader = require("../../middleware/expressUploader");

const changeProfilePicture = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { profileImg } = req.files || {};

  console.log("user =>", profileImg);

  if (!id || !profileImg) {
    return res.status(404).json({ message: "user id or image not provided !" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ message: "User does not exists !" });
  }

  // Remove old profile form the server

  if (user.profileImg) {
    const imagePath = join(baseName, "public", user.profileImg);
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
  //New profile upload into the server

  const uploadPath = await expressFileUploader(profileImg, "profileImg");

  if (profileImg && uploadPath === "")
    return res.status(400).json({ message: "file upload failed" });

  user.profileImg = uploadPath;

  const updatedUser = await user.save();

  if (updatedUser) {
    return res.status(200).json({
      status: 200,
      message: "Profile picture updated successfully .",
      user: updatedUser,
    });
  } else {
    return res.status(500).json({
      message: "server error",
    });
  }
});

module.exports = changeProfilePicture;
