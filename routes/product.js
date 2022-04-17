const express = require("express");
const {
  addProduct,
  findProductsByCount,
  removeProduct,
} = require("../controllers/product");
const router = express.Router();
router.post("/product", addProduct);
router.get("/product/:count", findProductsByCount);
router.delete("/product/:slug", removeProduct);
module.exports = router;
