const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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

  location: {
    type: String,
  },
  gender: {
    type: String,
  },
  status: {
    type: String,
  },
  school: {
    type: String,
  },
  college: {
    type: String,
  },
  university: {
    type: String,
  },
  work: {
    type: String,
  },
  companyName: {
    type: String,
  },
  workPlace: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
