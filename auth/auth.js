const jwt = require('jsonwebtoken');
const { default: isEmail } = require('validator/lib/isemail');
// const {admin} = require('../users/2userModel')

function isSignIn(req, res, next) {
    // console.log("inside isSignIn function");
    // console.log("typeof req.body :", typeof(req.body));
    // const length = length.req.body
    // console.log("length req.body :", req.body.length); 
    // console.log(Object.keys(req.body));
    // console.log(Object.keys(req.body).length);
    // if (Object.keys(req.body).length == 0) { 
    //     console.log("req.body is empty");
    //     return res.end("please insert username and password")
    // }
    // console.log("req.params :");
    // console.log("req.headers: ", req.headers); 
    const bearerToken = req.headers.authorization
    if (!bearerToken) {
        return res.end("token vared nashode")
    }
    const token = bearerToken.split(" ")[1]
    // console.log("token: ", token);
    // console.log("typeof token:", typeof (token));
    jwt.verify(token, 'ramz', function (err, decoded) {
        if (err) {
            console.log("err.message:", err.message);
            return res.end(err.message)
        } 
        console.log("decode:", decoded);
        // console.log("decoded.email: ", decoded.email);
        console.log("req.params-auth: ", req.params)
        // const permissions = req.body
        // permission(permissions)
        // admin(decoded)
        next()
    })
}

module.exports = isSignIn
