const mongoose = require('mongoose')

const newSchema = new mongoose.Schema({
   category:{
    type:String,
    enum:["women","men","kid"],
    required:true,
   },
   images:[String]
})

const NewCollection = mongoose.model("NewCollection",newSchema)
module.exports = NewCollection