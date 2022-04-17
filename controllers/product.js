const Product = require("../models/product");
const slugify = require("slugify");
exports.addProduct = async (req, res) => {
  try {
    const prod = req.body;
    prod.slug = slugify(`${prod.title} ${Date.now()}`);
    const product = await Product.create(prod);
    res.status(200).json({
      product,
    });
  } catch (err) {
    res.status(400).json({
      mes: err.message,
    });
  }
};
exports.findProductsByCount = (req, res) => {
  const { count } = req.params;
  Product.find({})
    .limit(count)
    .populate("category")
    .populate("subcategory")
    .sort({ updatedAt: -1 })
    .exec((err, data) => {
      if (err) {
        res.status(400).json({
          err,
        });
      } else {
        res.status(200).json({
          data,
        });
      }
    });
};
exports.removeProduct = (req, res) => {
  try {
    const { slug } = req.params;
    Product.findOneAndRemove({ slug }).exec((err, data) => {
      if (data) {
        res.status(200).json({
          Message: "Done",
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
