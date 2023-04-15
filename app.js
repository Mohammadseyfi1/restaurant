const express = require('express')
const productRoutes = require('./product/4productRouter')
const userRoutes = require('./users/4usersRouter')
const app = express()
// const logger = require("morgan")

// app.use(logger("combined"))
// app.use(logger(""))
app.use(express.json())

app.use("/products", productRoutes)
app.use("/user",userRoutes)

module.exports = app
