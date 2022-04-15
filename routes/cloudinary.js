const express = require("express");
const router = express.Router();
const { upload, remove } = require("../controllers/cloudinary");
const { authCheck, adminCheck } = require("../middlewares/auth");
router.post("/image-upload", upload);
router.delete("/image-remove/:id", remove);
module.exports = router;
