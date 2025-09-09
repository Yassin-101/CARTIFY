const NewCollection = require('../models/New')

// upload images

const uploadNewCollection = async(req,res)=>{
        const {category} = req.body
        if(!category) return res.status(400).send("Category is required")
            try {
                const images = req.files.map((file)=>`/uploads/${file.filename}`)
                // overwrite if category exist, else create new one
                const collection = await NewCollection.findOneAndUpdate(
                    {category},
                    {images},
                    {upsert:true,new:true}
                )
                res.json({success:true,collection})
            } catch (error) {
                console.error(error)
                res.status(500).send("Server Error")
            }
}

// this will only get one cetegory
const getNewCategory = async(req,res)=>{
    try {
        const collection = await NewCollection.findOne({category:req.params.category})
        res.json(collection || {category:req.params.category,images:[]})
    } catch (error) {
        console.error(error)
        res.status(500).send("Server Error")
    }
}

const getAllNewCategory = async(req,res)=>{
    try {
        const collection = await NewCollection.find({})
        res.json(collection)
    } catch (error) {
          console.error(error)
        res.status(500).send("Server Error")
    }
}

module.exports = {
    uploadNewCollection,getNewCategory,getAllNewCategory
}