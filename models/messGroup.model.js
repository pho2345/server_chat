const mongoose = require("mongoose");

const messageGroup = mongoose.Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Group",
        require: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false 
  }
);

module.exports = mongoose.model("MessageGroup", messageGroup);