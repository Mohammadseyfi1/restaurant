const express = require('express');
const { signin, signup, httpGetUsers } = require('./3userController');
const userRoutes = express.Router()
const isSignIn = require("../auth/auth.js")
const validator = require("../auth/validator")
const validation = [validator.emailBody, validator.passwordBody]
// const { body, validationResult } = require('express-validator')

userRoutes.post("/signup", validation, signup)
userRoutes.post("/signin", validation, signin)
userRoutes.get("/", isSignIn, httpGetUsers)

// userRoutes.post("/",body('email').isEmpty(), test)

// userRoutes.post("/", body('email').isEmail(), body('password').isStrongPassword({minLength: 12,
//     minLowercase: 1,
//     minUppercase: 1,
//     minNumbers: 1,
//     minSymbols: 1,
// }), test)

module.exports = userRoutes
