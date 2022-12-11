const Group = require("../models/group.model");

module.exports.createGroup = async (req, res, next) => {
  try {
    const { users, nameGroup, avatarImage, admin } = req.body;
    const data = await Group.create({
      nameGroup: nameGroup,
      users: [...users],
      avatarImage: avatarImage,
      admin: [...admin],
    });

    if (data)
      return res.json({
        msg: "Group create successfully!",
      });
    return res.json({
      msg: "Failed to create Group to DB",
    });
  } catch (err) {
    next(err);
  }
};
module.exports.addUser = async (req, res, next) => {
 
  try {
    const { userAdd, groupId } = req.body;
    const addUser = userAdd.map((e) => {
      return new Promise((rel, rej) => {
        Group.findByIdAndUpdate(groupId, {
          $push: {
            users: e,
          },
        }).exec((err, update) => {
          if (err) {
            return rej(err);
          }
          if (update) {
            return rel(update);
          }
        });
      });
    });

    const addAllUser = await Promise.all(addUser);
    console.log(addAllUser);
    res.end();
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const { userAdd, groupId } = req.body;

    Group.findByIdAndUpdate(groupId, {
      $pull: {
        users: { $in: userAdd },
      },
    }).exec((err, update) => {
      if (err) {
      }
      if (update) {
      }
    });

    res.end();
  } catch (error) {
    next(error);
  }
};


module.exports.getGroup = async (req, res, next) => {
  try {
    const id = req.params.id;
    const group = await Group.find({
      users : { $in : id }
    }).select([
      "nameGroup",
      "avatarImage",
      "_id"
    ]);
    res.status(200).send(group);
    res.end();
  } catch (error) {
    next(error);
  }
};
