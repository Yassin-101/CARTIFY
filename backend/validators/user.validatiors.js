const {body} = require('express-validator')

exports.signupValidation = [
    body('name').notEmpty().withMessage("Name is required"),
    body('email').isEmail().withMessage("Email is required"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 character")
]

exports.loginValidation = [
     body('email').isEmail().withMessage("Email is required"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 character")
]