const bcrypt = require("bcryptjs")
const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type:String,required:[true,"Name is required"]},
    email:{type:String,required:[true,"Email is required"],unique:true,lowercase:true,trim:true},
    password:{type:String,required:[true,"Password is required"],minLength:[6,"Pasword must be atleast 6 character long"],select:false},
},{
    timestamps:true,
})
// pre-save middleware to hash password

userSchema.pre('save',async function(next){
    const isPasswordModified = this.isModified('password')
    if(!isPasswordModified){
        return next()
    }
    const salt = await bcrypt.genSalt(10) // 10 rounds is a good balance
    const hashedPassword = await bcrypt.hash(this.password,salt)
    this.password = hashedPassword
    console.log("here is the pre", this.password)
    next()
})

// add method to compare password

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password)
}

const user = mongoose.model('User',userSchema)
module.exports = user
