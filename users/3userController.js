const { SignUP, SignIn, getUsers } = require('./2userModel')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { check, oneOf } = require('express-validator')
const validator = require('validator')

// const { check, oneOf } = require('express-validator')
// const validator = require('validator')
// const JSON = require('JSON')

async function signup(req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const key = errors.errors[0].param
        console.log("errors.errors[0]: ", errors.errors[0]);
        switch (key) {
            case "email":
                res.status(400).send('Invalid email address. Please try again.')
                break;
            case "password":
                res.status(400).send('Password must be longer than 5 and lower than 15 characters.')
                break;
            default:
                console.log("default switch case");
                next("default switch case")
                break;
        }
    }

    console.log("inside of signup");
    console.log("req.body-signup:", req.body);
    const token = await SignUP(req.body)
    res.end(token)
}

async function signin(req, res, next) {
    console.log('req.body-signin: ', req.body);
    const errors = validationResult(req)
    try {
        if (!errors.isEmpty() && errors.errors[0].param === 'email') {
            return res.status(400).send('Invalid email address. Please try again.')
        }
        if (!errors.isEmpty() && errors.errors[0].param === 'password') {
            return res
                .status(400)
                .send('Password must be longer than 6 characters.')
        }
    } catch (err) {
        next(err)
    }
    // body('email').isEmail(),
    // console.log(body('email').isEmail())
    // body('password').isLength({ min: 5 }),
    // function (req, res) {
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         res.status(400).json({ errors: errors.array() });
    //     }
    // }
    // console.log("after isEmail");
    const user = req.body
    const token = await SignIn(user)               //SignIn(req.body)
    res.end(token)
}

async function httpGetUsers(req, res) {
    const users = await getUsers()
    // console.log("typeof users-httpGetUsers: ",typeof(JSON.stringify(users)))
    res.end(JSON.stringify(users))
    // res.JSON(users)
}

function home() {
    res.send("Welcome")
}

async function permissions(req, res, next) {
    // const information = req.body
    // console.log("decoded-permissions: ", decoded);
    console.log("req.headers.authorization-permissions: ", req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, 'ramz', function (err, decoded) {
        if (err) {
            console.log("err.message:", err.message);
            return res.end(err.message)
        }
        console.log("decode:", decoded);
        // const permission = admin(decoded)
        // console.log("typeof permission: ", typeof (permission))
        bool = false
        if (decoded.email == "mohammadseyfi@email.com" && decoded.user == "admin") {
            bool = true
        }
        if (bool == false) {
            return res.send("You do not have permission to access")
        }
        next()
        // return "You have permission to access"
        // res.send(permission)
        // const decode = decoded
        // boss(decode)
    }
    )
}

// function test(req, res) {
// username must be an email
// body('username').isEmail(),
// password must be at least 5 chars long
// body('password').isLength({ min: 5 }),
// Finds the validation errors in this request and wraps them in an object with handy functions
// const errors = validationResult(req);
// if (!errors.isEmpty()) {
// return res.status(400).json({ errors: errors.array() });
// }

// User.create({
//     username: req.body.username,
//     password: req.body.password,
// }).then(user => res.json(user));
// }

// function test(req, res) {
//     oneOf([
//         check('nickname').isEmail(),
//         check('nickname').not().isEmpty().isString().custom((value, {req})=>{
//            if(!validator.isEmail(value)){
//              req.body.flag = true
//             //  you can handler your req.body here .... 

//            }
//            return true
//         })
//       ])
// }
async function test(req, res, next) {
    const errors = validationResult(req)
    console.log(" errors.errors[0]: ",  errors.errors[0]);
    try {
        if (!errors.isEmpty() && errors.errors[0].param === 'email') {
            return res.status(400).send('Invalid email address. Please try again.')
        }
        if (!errors.isEmpty() && errors.errors[0].param === 'password') {
            return res
                .status(400)
                .send('Password must be longer than 6 characters.')
        }
    } catch (err) {
        next(err)
    }
    //     const user = await User.create(req.body)
    //     req.login(user, err => (err ? next(err) : res.json(user)))
}

module.exports = {
    home,
    httpGetUsers,
    signin,
    signup,
    permissions,
    test
}
