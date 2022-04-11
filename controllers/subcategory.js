const Subcategory = require("../models/subcategory");
const slugify = require("slugify");
exports.addSubCategory = async (req, res) => {
  const { name, parent } = req.body;
  const subcategory = new Subcategory({ name, slug: slugify(name), parent });
  await subcategory
    .save()
    .then((subcat) => {
      if (subcat) {
        return res.status(200).json({ subcat });
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
exports.getAllSubCategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find({}).populate('parent','name').sort({ date: -1 });
    if (subcategories.length > 0) {
      res.status(200).json({ subcategories });
    } else {
      res.status(404).json({
        message: "No Sub-Category Found.",
      });
    }
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
exports.getSubCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    await Subcategory.findOne({ slug }).exec((err, subcategory) => {
      if (err) {
        res.status(400).json({
          err,
        });
      } else if (subcategory) {
        res.status(200).json({
          subcategory,
        });
      } else {
        res.status(404).json({
          message: "No Sub-Category Found.",
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      err,
    });
  }
};
exports.updateSubCategory = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const { slug } = req.params;
    await Subcategory.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name), parent },
      { new: true }
    ).exec((err, subcategory) => {
      if (err) {
        res.status(400).json({
          err,
        });
      } else if (subcategory) {
        res.status(200).json({
          subcategory,
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
exports.deleteSubCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    await Subcategory.findOneAndDelete({ slug }).exec((err, subcategory) => {
      if (err) {
        res.status(400).json({
          err,
        });
      } else if (subcategory) {
        res.status(200).json({
          subcategory,
        });
      } else {
        res.status(404).json({
          message: "No Such Sub-Category Found",
        });
      }
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};
