const { getAllMessageGroup, addMessageGroup } = require("../controllers/messagesGroup.controller");


const router = require("express").Router();

router.post("/getmsg", getAllMessageGroup);
router.post("/addmsgroup",[] , addMessageGroup);

module.exports = router;
