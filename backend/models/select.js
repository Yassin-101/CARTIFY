const mongoose = require('mongoose')

const selectedCollectionSchema = new mongoose.Schema({
    category:{type:String,required:true,enum:["women","men","kid"]},
    items:[
        {
            image:{type:String,required:true},
            name:{type:String,required:true}
        }
    ]
})
const selectedCollection = mongoose.model("SelectedCollection",selectedCollectionSchema)
module.exports = selectedCollection