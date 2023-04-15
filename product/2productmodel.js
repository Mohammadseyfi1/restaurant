const productDB = require('./1productSchema');

async function saveProduct(product) {
    product.id = await httpGetLatestId()
    return await productDB.create(product)
    // const getProducts = await productDB.find().sort({ id: 'desc' })
    // console.log("getProducts:", getProducts);
}

async function httpGetLatestId() {
    const getProduct = await productDB.findOne().sort({ id: 'desc' })
    // const getProduct = await productDB.findOne().sort({ id: 'asc' })
    console.log("getProduct-GetLatestId: ", getProduct);
    if (!getProduct) {
        return 1;
    }
    const id = ++getProduct.id
    return id
}

async function getProducts() {
    return await productDB.find({}, { _id: 0, __v: 0 })
    // .sort({ id: 'asc' })
}

async function editinformation(information) {
    const product = await productDB.findOneAndUpdate({ id: information.id }, { price: information.price }, { new: true })    //new?
    console.log("product-editinformation:", product);
    return product
    // if (productDB.id == req.body.id) {
    //     productDB.price = req.body.price
    // }
}

async function getProductWithId(id) {
    return await productDB.findOne({ id: id }, { _id: 0, __v: 0, date: 0 })
}

async function deleteProductWithId(id) {
    return await productDB.findOneAndDelete({ id: id })
}

async function sortProduct(chooseproduct) {
    if (chooseproduct.prop == "id") {
        return await productDB.find({}, { _id: 0, __v: 0, date: 0 }).sort({ id: 'desc' })
    }
    if (chooseproduct.prop == "name") {
        return await productDB.find({}, { _id: 0, __v: 0, date: 0 }).sort({ name: 'desc' })
    }
    if (chooseproduct.prop == "price") {
        console.log("inside if price");
        return await productDB.find({}, { _id: 0, __v: 0, date: 0 }).sort({ price: 'desc' })
    }
    //const key = chooseproduct
    // switch (key) {
    //     case key.name:
    //         return await productDB.findOne({ id: chooseproduct }, { _id: 0, __v: 0, date: 0 }).sort({name:'desc'})
    //         break;
    //     case key.price:
    //         return await productDB.findOne({ id: chooseproduct }, { _id: 0, __v: 0, date: 0 }).sort({price:'desc'})
    //         break;
    //     case key.id:
    //         return await productDB.findOne({ id: chooseproduct }, { _id: 0, __v: 0, date: 0 }).sort({id:'desc'})
    //         break;
    //     default:
    //         return "none of them"
    //         break;
    // }
}

module.exports = {
    saveProduct,
    getProducts,
    editinformation,
    getProductWithId,
    deleteProductWithId,
    sortProduct
}