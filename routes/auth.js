const express = require("express");
const router = express.Router();
const {
  createOrUpdate,
  getUser,
  createUser,
  login,
  checkLogin,
} = require("../controllers/auth");
const { authCheck } = require("../middlewares/auth");
router.post("/login", login);
router.post("/create-user", createUser);
router.post("/create-update-user", authCheck, createOrUpdate);
router.get("/get-user", authCheck, getUser);
router.post('/checklogin',checkLogin);
module.exports = router;
