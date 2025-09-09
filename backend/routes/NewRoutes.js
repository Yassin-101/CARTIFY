const express = require('express')
const multer = require('multer')
const path = require('path');
const { uploadNewCollection, getNewCategory, getAllNewCategory } = require('../controllers/NewController');

const router = express.Router()

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

// upload route max 12 images
router.post("/upload",upload.array("images",12),uploadNewCollection)

// get one category
router.get("/:category",getNewCategory)

// get all category
router.get("/",getAllNewCategory)

module.exports = router

