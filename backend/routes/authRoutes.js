const express = require('express')
const {signup,login} = require('../controllers/authControllers')
const { signupValidation, loginValidation } = require('../validators/user.validatiors')
const validate = require('../middlewares/validateMiddleware')

const router = express.Router()

router.post("/signup",signupValidation,validate,signup)
router.post("/login",loginValidation,validate,login)

module.exports = router