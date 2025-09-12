const SelectedCollection = require("../models/select");

//upload 4 images and name
const uploadSelectedCollection = async(req,res)=>{
    const {category,names} = req.body
    if(!category) return res.status(400).send("Category is required")
    
        try {
            // req.files then it will upload
            const images = req.files.map((file)=>`/uploads/${file.filename}`)
            const parName = JSON.parse(names)  // top trouser shirt

            if(images.length !== 4 || parName.length !== 4 ){
                return res.status(400).send("Exactly 4 images and names are required")
            }

            const items = images.map((img,i)=>({
                 image:img,
                name: parName[i]
            }))

            const collection = await SelectedCollection.findOneAndUpdate(
                {category},
                {items},
                {upsert:true,new:true}
            )
            res.json({success:true,collection})
        } catch (error) {
               console.error(err);
             res.status(500).send("Server error")
        }
}

// get one category
const getSelectCategory = async(req,res)=>{
    try {
        const collection = await SelectedCollection.findOne({category:req.params.category})
        res.json(collection || {category:req.params.category,items:[]})
    } catch (error) {
        console.error(err);
         res.status(500).send("Server error")
    }
}

// get all category

const getAllSelectCategory = async(req,res)=>{
    try {
        const collection = await SelectedCollection.find({})
        res.json(collection)
    } catch (error) {
        console.error(err);
             res.status(500).send("Server error")
    }
}

module.exports ={uploadSelectedCollection,getSelectCategory,getAllSelectCategory}
