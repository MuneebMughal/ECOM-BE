const express = require("express");
const router = express.Router();
const { upload, remove } = require("../controllers/cloudinary");
const { authCheck, adminCheck } = require("../middlewares/auth");
router.post("/image-upload", upload);
router.delete("/image-remove", remove);
module.exports = router;
