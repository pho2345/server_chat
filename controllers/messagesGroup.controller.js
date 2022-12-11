const messageGroup = require("../models/messGroup.model");
const ObjectId = require("mongoose").Types.ObjectId;
module.exports.getAllMessageGroup = async (req, res, next) => {
    try {
        const {groupId} = req.body;
        const messages = await messageGroup.find(
            {
                group : ObjectId(groupId)
                
            }
        ).select([
            "message",
            "group",
            "sender",
            "-_id"
        ]).populate("sender", "-isAvatarImageSet -_id -password -email -__v").
        sort({ updatedAt: -1 }).limit(10);

        // const projectMessages = messages.map((msg)=>{
        //     return{
        //         fromSelf: msg.sender.toString() === from,
        //         message: msg.message.text,
        //     };
        // });

        const data = [];
        for(var i = messages.length -1 ; i >=0 ; i--){
            data.push(messages[i]);
        }
        res.json(data);
    } catch (error) {
        next(error);
    }
};


module.exports.addMessageGroup = async (req, res, next) => {
    try {
        const {from, group, message} = req.body;
        const data = await messageGroup.create({
            message:{
                text: message
            },
            group : group._id,
            sender: from._id,
        });

        if(data) return res.json({
            msg: "Message added successfully!"
        });
        return res.json({ 
            msg: "Failed to add message to DB"
        });

    } catch (err) {
        next(err);
    }
};