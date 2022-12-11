const Friend = require("../models/friend.model");
module.exports.create = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const data = Friend.create({
      user_id: from._id,
      friend_id: [],
    });

    if (data) {
      return res.status(200).send({ msg: "Created list friend" });
    }
    return res.status(500).send({ msg: "Faild create list friend" });
  } catch (error) {
    next(error);
  }
};
module.exports.addFriend = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    Friend.findOneAndUpdate(
      { user_id: from._id },
      {
        $push: {
          friend_id: to._id,
        },
      }
    ).exec((err, update) => {
      if (err) {
        res.status(500).send({ msg: "Failed Accepted" });
        return;
      }
      if (update) {
        res.status(200).send({ msg: "Successfull Accepted" });
      }
    });
  } catch (error) {
    next(error);
  }
 
};
