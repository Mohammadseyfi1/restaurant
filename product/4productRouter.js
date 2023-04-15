const { httpSaveProduct, httpGetProducts, editproduct, httpGetProduct, httpDeleteProduct } = require('./3productController')
const { permissions } = require('../users/3userController')
const express = require('express');
const isSignIn = require('../auth/auth')
const productRoutes = express.Router()
 
productRoutes.post("/editproduct", isSignIn, permissions, editproduct)
productRoutes.get("/id/:id", isSignIn, httpGetProduct)
productRoutes.delete("id/:id", isSignIn, permissions, httpDeleteProduct)
productRoutes.get("/",isSignIn,httpGetProducts )
//productRoutes.get("/:prop", httpGetProducts)
// productRoutes.get("/", isSignIn, httpGetProducts)
productRoutes.post("/", isSignIn, permissions, httpSaveProduct)

module.exports = productRoutes
 