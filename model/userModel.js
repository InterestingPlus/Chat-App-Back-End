const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
  to: {
    type: String,
    default: "",
  },
});

// Define an index using createIndexes (recommended)
// userScheme.index({ username: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("Users", userScheme);
