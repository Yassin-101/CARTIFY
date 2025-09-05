const express = require("express");
const multer = require("multer");
const path = require("path");
const Header = require("../models/header");

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// Upload images for category
router.post("/upload", upload.array("images", 10), async (req, res) => {
  const { category } = req.body;
  if (!category) return res.status(400).send("Category is required");

  try {
    const images = req.files.map(file => `/uploads/${file.filename}`);

    // Upsert: replace old images if exist
    const header = await Header.findOneAndUpdate(
      { category },
      { images },
      { upsert: true, new: true }
    );

    res.json({ success: true, header });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get images for one category
router.get("/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const header = await Header.findOne({ category });
    res.json(header || { category, images: [] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get all images grouped by category
router.get("/", async (req, res) => {
  try {
    const headers = await Header.find({});
    const result = headers.map(h => ({ category: h.category, images: h.images }));
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
