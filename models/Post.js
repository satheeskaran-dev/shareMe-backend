const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    description: String,
    image: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
