const { body, validationResult } = require('express-validator')

const emailBody = body('email').isEmail()
const passwordBody = body('password').isLength({ min: 5, max: 15 })

module.exports = {
    emailBody,
    passwordBody
}