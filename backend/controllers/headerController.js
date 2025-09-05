const express = require("express");
const multer = require("multer");
const path = require("path");
const Header = require("../models/header");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// ✅ Upload images for a category
router.post("/upload", upload.array("images", 10), async (req, res) => {
  const category = req.body.category;
  if (!category) return res.status(400).send("Category is required");

  const images = req.files.map(file => `/uploads/${file.filename}`);

  try {
    // Replace existing document or create new
    const updated = await Header.findOneAndUpdate(
      { category },
      { images },
      { new: true, upsert: true }
    );

    res.json({ success: true, images: updated.images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "DB error" });
  }
});

// ✅ Get one category
router.get("/:category", async (req, res) => {
  const doc = await HeaderImage.findOne({ category: req.params.category });
  res.json({ category: req.params.category, images: doc ? doc.images : [] });
});

// ✅ Get all categories
router.get("/", async (req, res) => {
  try {
    const headers = await Header.find({});
    res.json(headers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;
