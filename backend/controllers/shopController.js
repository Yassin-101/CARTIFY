const ShopProduct = require("../models/shopProduct")

// upload one product
const uploadShopProduct = async(req,res)=>{
    try {
        const {name,price,category,subCategory} = req.body
        if(!req.file) return res.status(400).send("Image is required")
            if(!name || !price || !category || !subCategory) return res.status(400).send("Missing fields")

                const imagePath = `/uploads${req.file.filename}`

                const product = new ShopProduct({
                    category,subCategory,name,price:Number(price),image:imagePath,
                })
                await product.save()
                return res.json({success:true,product})
    } catch (error) {
         console.error(error);
    return res.status(500).send("Server error");
    }
}

// get shopproduct by category and subcategory
const getShopProductByCategory = async(req,res)=>{

    try {
        const {category,subCategory} = req.params
        const product = await ShopProduct.find({category,subCategory})
        return res.json({success:true,product})
    } catch (error) {
         console.error(error);
    return res.status(500).send("Server error");
    }
}

// get all shopProduct 
const getAllShopProduct = async(req,res)=>{
    try {
        const product = await ShopProduct.find({})
        return res.json({success:true,product})
    } catch (error) {
         console.error(error);
    return res.status(500).send("Server error");
    }
}

module.exports = {uploadShopProduct,getShopProductByCategory,getAllShopProduct}