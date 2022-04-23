const express = require("express");
const { addCategory,getAllCategories,getCategory,updateCategory,deleteCategory,getSub } = require("../controllers/category");
const { authCheck, adminCheck } = require("../middlewares/auth");
const router = express.Router();
router.post("/add-category", authCheck, adminCheck, addCategory);
router.get("/category-list", getAllCategories);
router.get("/category/:slug", getCategory);
router.post("/category/:slug",authCheck,adminCheck,updateCategory);
router.delete('/category/:slug',authCheck,adminCheck,deleteCategory);
router.get('/category/sub/:sub', getSub)
module.exports = router;
