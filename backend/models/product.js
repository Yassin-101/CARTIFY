const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
  {
  productType:{type:String,default:""},
  name:{type:String,required:true},
  price:{type:Number,required:true},
  images:{type:[String],required:true},
  colors:{type:[String],default:[]},
  sizes:{type:[String],default:[]},
  articleNumber:{type:String,default:""},
  ageGroup:{type:String,default:""},
  garmentLength:{type:String,default:""},
  category:{type:String,required:true},
  subCategory:{type:String,required:true},
  newCollection:{type:Boolean,default:false},
  selectedCollection:{type:Boolean,default:false}

},
 { timestamps: true }
);

const Product = mongoose.model("Product",productSchema)
module.exports = Product