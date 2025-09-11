const path = require("path");
const Header = require("../models/header");

// ✅ Upload images for a category
const uploadImages = async (req, res) => {
  const category = req.body.category
  if (!category) return res.status(400).send("Category is required")

  const images = req.files.map(file => `/uploads/${file.filename}`)

  try {
    // Replace existing document or create new
    const updated = await Header.findOneAndUpdate(
      { category },
      { images },
      { new: true, upsert: true }
    );

    res.json({ success: true, images: updated.images })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, message: "DB error" })
  }
};

// ✅ Get one category
const getCategory = async (req, res) => {
  try {
    const doc = await Header.findOne({ category: req.params.category })
    res.json({ category: req.params.category, images: doc ? doc.images : [] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
}

// ✅ Get all categories
const getAllCategories = async (req, res) => {
  try {
    const headers = await Header.find({})
    res.json(headers)
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false })
  }
};

module.exports = {
  uploadImages,
  getCategory,
  getAllCategories,
};
