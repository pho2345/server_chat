 const requestFriend = require('../models/requestFriend.model')
checkFromAndTo = (req, res, next) => {
    const {from,to} = req.body;
    requestFriend.findOne({
        from : from._id,
        to : to._id
    }).exec((err, request) => {
        
        if(err) {
            res.status(500).send({msg : err});
            return
        }
        if(request){
            res.status(400).send({msg : "badd req"});
            return 
        }
        if(!request){
            next();
        }
    })
}

var verifyRequestFriend = {
    checkFromAndTo
}
module.exports = verifyRequestFriend