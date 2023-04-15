const User = require('./1usersSchema');
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator');

async function SignUP(user) {
    console.log("userInSignUp:", user);
    if (Object.keys(user).length < 3) {
        console.log("req.body is not enough");
        // return res.end("please insert username and password and email")
        const problem = "please insert username and password and email"
        return problem
    }
    const userDB = await User.findOne({ username: user.username },{_id:0, __v:0})
    console.log("userDB-SignUp: ", userDB)
    if(userDB != null){
    
        const problem = "this username is already in use"
        return problem
    }
    await User.create(user)
    const token = jwt.sign(
        { user: user.username, email: user.email },
        "ramz", { expiresIn: 60 * 60 }
    );
    return token
}

async function SignIn(user) {
    const userDB = await User.findOne({ username: user.username })
    if (Object.keys(user).length < 3) {
        console.log("req.body is not enough");
        // return res.end("please insert username and password and email")
        const problem = "please insert username and password and email"
        return problem
    }
    if (!userDB) {
        return "username ya password ya email eshtebah ast"
    }
    if (user.password == userDB.password) {
        const token = jwt.sign(
            { user: user.username, email: user.email },
            "ramz", { expiresIn: 60 * 60 }
        );
        return token
    } else {
        return "username ya password eshtebah ast"
    }
}

async function getUsers() {
    return await User.find({}, { __v: 0, _id: 0 })
}

// async function isSignIn(user, next) {
//     let bool = false
//     const userDB = await User.find({})
//     console.log(user);
//     User.forEach(function(user) {
//         if (user.username == user.username && user.password == user.password) {
//             const token = jwt.sign(
//                 { user : user.username },
//                 "ramz"
//               );
//             console.log("log in");
//             bool = true
//         }
//     });
//     if (!bool || bool == true) {
//         res.send("not log in")
//     }

//     next()
// }

// function admin(decoded) {
//     console.log("decoded.email-admin: ", decoded.email)
//     // User.forEach(function (user) {
//     // })
//     console.log("typeof User :", typeof (User));
//     // User.forEach(function (user) {
//     //     if (user.email == decoded.email && user.username == decoded.user) {
//     // next()
//     //     }
//     // });
//     // const userDB = await User.findOne({ username: decoded.user, email: decoded.email })
//     bool = true
//     if (decoded.email == "mohammadseyfi@email.com" && decoded.user == "admin") {
//         bool = false
//     }
//     if (bool == false) {
//         return "You have permission to access"
//     }
//     // return next()
//     // return bool = true
//     return "You do not have permission to access"
// }

module.exports = {
    SignUP,
    SignIn,
    getUsers
}
