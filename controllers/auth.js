const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require('lodash');
require("dotenv").config();
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
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existedUser = User.findOne({ email });
    if (existedUser) {
      res.status(400).json({
        Error: "User already exist",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const user = new User({ name, email, password: hashPassword });
      user.save().then((user) => {
        return res.status(200).json({
          user,
        });
      });
    }
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      bcrypt.compare(password, existedUser.password).then((result) => {
        if (result) {
          const user = _.omit(existedUser.toObject(),['_id','password','cart']);
          const accessToken = jwt.sign(user, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "1d",
          });
          res.status(200).json({
            accessToken,
            user,
          });
        } else {
          res.status(400).json({
            Error: "Invalid Username or Password.",
          });
        }
      });
    } else {
      res.status(400).json({
        Error: "Invalid Username or Password.",
      });
    }
  } catch (err) {
    res.status(400).json({ Error: "Something Went Wrong." });
  }
};

exports.checkLogin = (req, res) => {
  try {
    let token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";
    if (token) {
      const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return res.status(200).json({
        user,
      });
    } else {
      throw new Error("Token does not exist");
    }
  } catch (err) {
    return res.status(401).json({
      err: err ? (err.message ? err.message : err) : "Error",
    });
  }
};
