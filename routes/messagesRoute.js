const { getMessage, addMessage } = require("../controllers/messagesController");

const router = require("express").Router();

router.post("/getmsg", getMessage);
router.post("/addmsg", addMessage);

module.exports = router;
