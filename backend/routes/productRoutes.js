const express = require("express")
const multer = require("multer")
const path = require("path")

const {  uploadProduct,
  getNewCollection,
  getByCategory,
  getProductById,getSelectedCollection} = require("../controllers/productController");

const router = express.Router()

// multer config
const storage = multer.diskStorage({
  destination:(req,file,cb) => cb(null,"uploads/"),
  filename:(req,file,cb) => cb(null,Date.now() + path.extname(file.originalname))
})
const upload = multer({storage})

// upload upto 4 images for both collections
router.post("/upload",upload.array("images",4),uploadProduct)
router.post("/selected-collection",upload.array("images",4),uploadProduct)

//fetch routes
router.get("/new-collection",getNewCollection)
router.get("/selected-collection",getSelectedCollection)

// to keep the dynamic routes at last
router.get("/:category/:subCategory",getByCategory)
router.get("/:id",getProductById)

module.exports = router