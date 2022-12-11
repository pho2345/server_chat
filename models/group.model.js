const mongoose = require("mongoose");

const groupSchema = mongoose.Schema(
  {
    users: Array,
    admin : Array,
    nameGroup: {
      type : String,
      default : "",
    },
    avatarImage: {
      type: String,
      default: ""
  }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Groups", groupSchema);
