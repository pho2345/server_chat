const mongoose = require("mongoose");

const resquetFriend = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("resquetFriend", resquetFriend);
