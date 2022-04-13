const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 32,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subcategory: [
      {
        value: {
          type: ObjectId,
          ref: "Subcategory",
        },
        label: String,
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    brand: String,
    color: String,
    rating: [
      {
        star: Number,
        givenBy: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
