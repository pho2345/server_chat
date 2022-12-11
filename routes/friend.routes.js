
const { addFriend, create } = require("../controllers/friend.controller");
var verifyFriend = require("../middlewares/verifyFriend");

const router = require("express").Router();

router.post("/create", [], create );

//router.post("/accept", [verifyFriend.checkAcceptRequest], addFriend);
module.exports = router;
