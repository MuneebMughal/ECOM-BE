const admin = require("../firebase");
const User = require("../models/user");
exports.authCheck = async (req, res, next) => {
  try {
    let token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";
    if (token) {
      const FbUser = await admin.auth().verifyIdToken(token);
      req.user = FbUser;
      next();
    } else {
      throw new Error("Token does not exist");
    }
  } catch (err) {
    return res.status(401).json({
      err : err ? err.message ? err.message : err : "Error" 
    });
  }
};
exports.adminCheck = async (req, res, next) => {
  try {
    await User.findOne({ email: req.user.email }).exec((err, user) => {
      if (err) {
        return res.status(400).json({
          err,
        });
      } else if (user) {
        if (user.role && user.role === "admin") {
          next();
        } else {
          return res.status(403).json({
            err: "Access Denied!",
          });
        }
      }
    });
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};
