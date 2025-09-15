const mongoose = require('mongoose')

const selectedCollectionSchema = new mongoose.Schema({
    category:{type:String,required:true,enum:["women","men","kid"]},
    items:[
        {
            image:{type:String,required:true},
            name:{type:String,required:true},
            subCategory: { type: String, required: true } // added so clicking knows where to go
        }
    ]
})
const selectedCollection = mongoose.model("SelectedCollection",selectedCollectionSchema)
module.exports = selectedCollection