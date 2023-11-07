const {
  register,
  login,
  setAvatar,
  getUsers,
  toChat,
  confirmChat,
} = require("../controllers/usersController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar", setAvatar);
router.post("/setTo", toChat);
router.post("/getTo", confirmChat);

router.get("/users/:id", getUsers);

module.exports = router;
