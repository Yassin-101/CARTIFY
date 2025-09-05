const jwt = require('jsonwebtoken')
const user = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const generateToken = require("../utils/jwt");

exports.signup = catchAsync(async(req,res,next)=>{
    const {name,email,password} = req.body

    // if there is any user exist in the same email
    const existingUser = await user.findOne({email})
    if(existingUser){
        const error = new Error("Email is already in use")
        error.statusCode = 400
        return next(error)
    }

    // create the  user
    const createUser = new user({name,email,password})
    await createUser.save()

    // generate JWT Token
    const token = generateToken(createUser._id)

    return res.responseFormatter({
        statusCode: 201,
        message:"User registered Successfully",
        data:{
            user:createUser,
            token
        }
    })

})

exports.login = catchAsync(async(req,res,next)=>{
    const {email,password} = req.body

    // fixed admin
   if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
    const token = jwt.sign({role:"admin"}, process.env.JWT_SECRET, {expiresIn:"1d"})
    return res.responseFormatter({
        statusCode:200,
        message: "Admin login successful",
        data: {
            User: { name: "Admin", email, role: "admin" },
            token
        }
    })
}

    //find user by email including password field(select password explicity)
    const User = await user.findOne({email}).select('+password')

    if(!User){
        const error = new Error("Invalid email and password")
        error.statusCode = 401
        return next(error)
    }
    // compare password
    const isMatch = await User.comparePassword(password)
    if(!isMatch){
        const error = new Error("Invalid email and password")
        error.statusCode = 401
        return next(error)
    }

    // generate jwt token
    const token = generateToken(User._id)
    const userObjectWithoutPassword = User.toObject()
    delete userObjectWithoutPassword.password

    return res.responseFormatter({
        statusCode:200,
        message:"Login successfully",
        data:{
            User:userObjectWithoutPassword,
            token
        }
    })
})