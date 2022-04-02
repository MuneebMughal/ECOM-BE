const User = require("../models/user");
exports.createOrUpdate = async (req, res) => {
  try {
    const { name, picture, email } = req.user;
    const existedUser = await User.findOneAndUpdate(
      { email },
      { picture, name: name || email.split("@")[0] },
      { new: true }
    );
    if (existedUser) {
      return res.status(200).json({
        message: "User Updated Successfully!",
        user: existedUser,
      });
    } else {
      const newUser = await new User({
        name: name || email.split("@")[0],
        picture,
        email,
      }).save();
      return res.status(200).json({
        message: "User Added Successfully",
        user: newUser,
      });
    }
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    await User.findOne({ email: req.user.email }).exec((err, user) => {
      if (user) {
        return res.status(200).json({
          user,
        });
      } else {
        return res.status(400).json({
          err,
        });
      }
    });
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};
