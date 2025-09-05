const jwt = require('jsonwebtoken')
const generateToken = (userId) =>{
    //1 data you want to attach to token
    //2 your token secret
    //3 validity of your token

    return jwt.sign(
        {
            id:userId,
        },
            process.env.JWT_SECRET,
        {
            expiresIn:"7d",
        }
    )
}

module.exports = generateToken