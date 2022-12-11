
const { createGroup,addUser ,deleteUser, getGroup } = require("../controllers/group.controller");

const router = require("express").Router();
router.post("/create", createGroup);
router.post("/add", addUser);
router.delete("/delete", deleteUser );
router.get("/:id", getGroup);
module.exports = router;
