const express = require("express")
const router = express.Router()
const multer = require("multer")
const {uploadShopProduct,getShopProductByCategory,getAllShopProduct} = require("../controllers/shopController")

const storage = multer.diskStorage({
    destination:(req,file,cb) =>cb(null,"uploads/"),
    filename:(req,file,cb) =>cb(null,Date.now()+"-"+file.originalname)
})
const upload = multer({storage})

// uplaod single products
router.post("/upload",upload.single("image"),uploadShopProduct)

//get products by category/subCategory
router.get("/:category/:subCategory",getShopProductByCategory)

// get all products
router.get("/",getAllShopProduct)

module.exports = router