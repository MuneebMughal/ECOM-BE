const Product = require("../models/product");
const slugify = require("slugify");
exports.addProduct = async (req, res) => {
    console.log(req.body);
  try {
    const  prod  = req.body;
    prod.slug = slugify(prod.title);
    const product = await Product.create(prod);
    res.status(200).json({
      product,
    });
  } catch (err) {
    res.status(400).json({
      mes:err.message,
    });
  }
};
