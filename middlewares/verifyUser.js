const User = require("../models/userModel");
verifyUserForRequestFriend = async (req, res, next) => {
  const { from, to } = req.body;
  try {
    var userFrom = await User.findById(from._id);
    if (userFrom) {
      try {
        var userTo = await User.findById(to._id);
        if (userTo) {
          next();
        }
      } catch (error) {
        res.status(500).send({ msg: error });
        return;
      }
      res.status(400).send({ msg: "Bad request!! Not find User " });
      return;
    }
    else {
      res.status(400).send({ msg: "Bad request!! Not find User " });
      return;
    }
  } catch (error) {
    res.status(500).send({ msg: error });
    return;
  }
};

var verifyUser = {
  verifyUserForRequestFriend,
};
module.exports = verifyUser;
