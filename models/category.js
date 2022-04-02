const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is Required",
      minlength: [2, "Name should be atleast 3 charraters long."],
      maxlength: [32, "Name can't be greater than 32 characters"],
      unique:true
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Category', CategorySchema);