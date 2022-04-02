const Category = require("../models/category");
const slugify = require("slugify");
const category = require("../models/category");
exports.addCategory = async (req, res) => {
  const { name } = req.body;
  const category = new Category({ name, slug: slugify(name) });
  await category
    .save()
    .then((cat) => {
      if (cat) {
        return res.status(200).json({ cat });
      }
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          err,
        });
      }
    });
};
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ date: -1 });
    if (categories.length > 0) {
      res.status(200).json({ categories });
    } else {
      res.status(404).json({
        message: "No Category Found.",
      });
    }
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
exports.getCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    await Category.findOne({ slug }).exec((err, category) => {
      if (err) {
        res.status(400).json({
          err,
        });
      } else if (category) {
        res.status(200).json({
          category,
        });
      } else {
        res.status(404).json({
          message: "No Category Found.",
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { slug } = req.params;
    await Category.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name) },
      { new: true }
    ).exec((err, category) => {
      if (err) {
        res.status(400).json({
          err,
        });
      } else if (category) {
        res.status(200).json({
          category,
        });
      } else {
        res.status(404).json({
          message: "No Such Category Found",
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    await Category.findOneAndDelete({ slug }).exec((err, category) => {
      if (err) {
        res.status(400).json({
          err,
        });
      } else if (category) {
        res.status(200).json({
          category,
        });
      } else {
        res.status(404).json({
          message: "No Such Category Found",
        });
      }
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};
