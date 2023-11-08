const mongoose = require("mongoose");

const messageScheme = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Define an index using createIndexes (recommended)
// messageScheme.index({ sender: 1 });

module.exports = mongoose.model("Messages", messageScheme);
