const mongoose = require("mongoose");

const headerImageSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["women", "men", "kid"], // optional restriction
    required: true,
  },
  images: [String], // stores image URLs like "/uploads/xxx.jpg"
});

const header = mongoose.model("Header", headerImageSchema);
module.exports = header
