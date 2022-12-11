const { addMessage, getAllMessage, getOneMessage } = require("../controllers/messagesController");
const verifyAuth = require('../middlewares/verifyauth')

const router = require("express").Router();

router.post("/addmsg/",[] , addMessage);
router.post("/getmsg/", getAllMessage);
router.post("/getonemsg/", getOneMessage);


module.exports = router;
