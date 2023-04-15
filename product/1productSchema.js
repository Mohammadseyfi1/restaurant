const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const productDB = mongoose.model('Product', productsSchema);        //?????????????????????

module.exports = productDB