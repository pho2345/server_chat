const Friend = require("../models/friend.model");
checkAcceptRequest = (req, res, next) => {
    const { from, to } = req.body;
    Friend.findOne({
        user_id: from._id,
        friend_id : { $in : to._id}
      }).exec((err, user) => {
        if(err)  {
            res.status(500).send({ msg : err});
            return;
        }
        if(user)  {
            res.status(400).send({ msg : "Bad request"});
            return;
        }
        next();
    
      })
}

var verifyFriend = {
    checkAcceptRequest,
}

module.exports = verifyFriend;