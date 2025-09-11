const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  uploadImages,
  getCategory,
  getAllCategories,
} = require("../controllers/headerController");

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

// Routes
router.post("/upload", upload.array("images", 10), uploadImages);
router.get("/:category", getCategory);
router.get("/", getAllCategories);

module.exports = router;
