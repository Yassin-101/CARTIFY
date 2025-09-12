const express = require('express')
const multer = require('multer')
const { uploadSelectedCollection, getSelectCategory, getAllSelectCategory } = require('../controllers/selectControllers')

const router = express.Router()

// multer setup
const storage = multer.diskStorage({
    destination:(req,file,cd) => cd(null,"uploads/"),
    filename:(req,file,cd) =>cd(null,Date.now()+"-"+ file.originalname)
})

const upload = multer({storage})

// upload 4 images + name   
router.post("/upload",upload.array("images",4),uploadSelectedCollection)

// get category
router.get("/:category",getSelectCategory)

// get all category
router.get("/",getAllSelectCategory)

module.exports = router