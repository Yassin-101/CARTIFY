const Product = require("../models/product")

const uploadProduct = async(req,res) =>{
  try {
    let files = []

    if(req.files && req.files.length > 0){
      files = req.files.map((f)=>`/uploads/${f.filename}`)
    }

    const product = new Product({
      ...req.body,
      images: files,
      colors: req.body.colors ? JSON.parse(req.body.colors) : [],
      sizes: req.body.sizes ? JSON.parse(req.body.sizes) : [],
      newCollection: req.body.newCollection === "true" || req.body.newCollection === true,
      selectedCollection: req.body.selectedCollection === "true" || req.body.selectedCollection === true,
    })

    await product.save()
    res.status(201).json({message:"Product uploaded successfully", product})
    
  } catch (error) {
    console.error(error)
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate article number. Product already exists." });
    }
    res.status(500).json({ message: "Failed to upload product", error: error.message });
  }
}

// get products by newCollection
const getNewCollection = async(req,res)=>{
  try {
    const products = await Product.find({newCollection: true})
    res.json({products})
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch new collection" });
  }
}

// get products by slected collection
const getSelectedCollection = async(req,res)=>{
  try {
    // fetch all product when selected collection is true
    const products = await Product.find({selectedCollection: true})

    // this should return an array even if its empty
    return res.status(200).json({products})
  } catch (error) {
     console.error("Error fetching selected collection products:", error);
    return res.status(500).json({ message: "Failed to fetch product" });
  }
} 

// get products by category/subCategory
const getByCategory = async(req,res)=>{
  try {
    const {category,subCategory} = req.params
    const products = await Product.find({category,subCategory})
    res.json({products})
  } catch (error) {
        res.status(500).json({ message: "Failed to fetch products" });
  }
}

const getProductById = async(req,res)=>{
  try {
    const products = await Product.findById(req.params.id)
    res.json({products})
  } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
  }
}
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching all products:", error);
    res.status(500).json({ message: "Failed to fetch all products" });
  }
};


module.exports = {uploadProduct,getNewCollection,getSelectedCollection,getByCategory,getProductById,  getAllProducts}