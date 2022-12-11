const {
  requestAddfriend,
  acceptRequest,
} = require("../controllers/requestFriend.controller");
const verifyRequestFriend = require("../middlewares/verifyRequestFriend");
var verifyFriend = require("../middlewares/verifyFriend");
var verifyUser = require("../middlewares/verifyUser");

const router = require("express").Router();

router.post(
  "/addfriend",
  [ verifyUser.verifyUserForRequestFriend,
    verifyRequestFriend.checkFromAndTo, ],
  requestAddfriend
);

router.post("/accept", [verifyFriend.checkAcceptRequest], acceptRequest);
module.exports = router;
