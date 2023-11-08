const User = require("../model/userModel");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username is already in use
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }

    // Check if the email is already in use
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }

    // Create a new user
    const user = await User.create({
      email,
      username,
      password,
    });

    // Remove the password from the response
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    // Log the error to the console or a log file
    console.error("Error in user registration:", error);

    // Pass the error to the error-handling middleware
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already in use
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    if (password !== user.password) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }
    delete user.password;

    return res.json({ status: true, user });
  } catch (error) {
    // Log the error to the console or a log file
    console.error("Error in user Login:", error);

    // Pass the error to the error-handling middleware
    next(error);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    // const userId = req.params.id;
    const userId = req.body.user._id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });

    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports.toChat = async (req, res, next) => {
  try {
    const userId = req.body.user;
    const userTo = req.body.to;

    const userData = await User.findByIdAndUpdate(userId, {
      to: userTo,
    });

    return res.json(userData);
  } catch (err) {
    next(err);
  }
};

module.exports.confirmChat = async (req, res, next) => {
  try {
    const userId = req.body.user;
    const userData = await User.findOne({ _id: userId }).select(["to"]);

    return res.json(userData);
  } catch (err) {
    next(err);
  }
};
