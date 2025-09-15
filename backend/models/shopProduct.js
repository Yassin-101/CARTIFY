// models/Product.js
const mongoose = require("mongoose");

const shopProductSchema = new mongoose.Schema({
  category: { type: String, required: true, enum: ["women", "men", "kid"] },
  subCategory: { type: String, required: true }, // e.g. "dress", "top"
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // stored path: /uploads/...
  createdAt: { type: Date, default: Date.now }
});

const shopProduct = mongoose.model("ShopProduct", shopProductSchema);
module.exports = shopProduct
