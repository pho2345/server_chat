const resquetFriend = require('../models/requestFriend.model');
const Friend = require('../models/friend.model');

module.exports.requestAddfriend = async (req, res, next) => {
    try {
        const {from,to} = req.body;
        const request = await resquetFriend.create({
           from : 
                from._id
           ,
            to : 
                to._id
            
        });

        if(request) {
            res.status(200).send({msg : "success to resquest friend"})
            return;
        }
        res.status(500).send({ msg : "faild to request"});

     
    } catch (error) {
        next(error);
    }
};

module.exports.acceptRequest = async (req, res, next) => {
    try {
        const {from,to} = req.body;
        const request = await resquetFriend.updateOne({
           from : 
                from._id
           ,
            to : 
                to._id
            
        }, {
            $set : {
                status : true
            }
        });

        if(request) {
            Friend.findOneAndUpdate( { user_id: from._id }, {
                $push: {
                    friend_id: to._id,
                },
              }).exec((err, update) => {
                if (err) {
                    res.status(500).send({ msg : "accepted failed"});
                }
                if (update) {
                    res.status(200).send({msg : "Accepted"})
                  return
                }
              });
           
            return;
        }
        res.status(500).send({ msg : "faild to request"});

     
    } catch (error) {
        next(error);
    }
};