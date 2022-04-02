const express = require("express");
const router = express.Router();
const { createOrUpdate,getUser } = require("../controllers/auth");
const { authCheck } = require("../middlewares/auth");
router.post("/create-update-user", authCheck, createOrUpdate);
router.get('/get-user',authCheck,getUser);
module.exports = router;
