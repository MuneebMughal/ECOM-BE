const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    address: { type: String, trim: true },
    role: {
      type: String,
      default: "subscriber",
      trim: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    picture: String,
    // wishlist:[{type:ObjectId,ref:'Product'}]
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
