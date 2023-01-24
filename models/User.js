const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },

    location: String,
    gender: String,
    status: String,
    school: String,
    college: String,
    university: String,
    work: String,
    companyName: String,
    workPlace: String,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: String,
    coverImg: String,
    followers: [],
    following: [],
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
