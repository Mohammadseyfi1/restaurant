const { saveProduct, getProducts, editinformation, getProductWithId, deleteProductWithId, sortProduct } = require('./2productmodel');
const productDB = require('./1productSchema');

async function httpSaveProduct(req, res) {
    console.log("req.body:", req.body);
    const product = req.body                   //chera bayad const bashe?
    const savedProduct = await saveProduct(product)
    res.json(savedProduct)
}

async function httpGetProducts(req, res) {
    console.log("inside httpGetProducts");
    // if (req.url == "/products") {
    // console.log("req.url: ", req.url);
    // console.log("req.params: ", req.params);
    console.log("req.query: ",req.query);
    const chooseproduct = req.params
    // console.log("chooseproduct ",chooseproduct);
    // const params = await sortProduct(chooseproduct)
    // const allproducts = await getProducts()
    // console.log("typeof allproducts: ", typeof (allproducts))
    // res.send(params)
    // res.send(allproducts)
    res.send(req.query)
    // }
}

async function editproduct(req, res) {
    console.log("req.body:", req.body);
    const information = req.body
    const product = await editinformation(information)
    res.end(JSON.stringify(product))
    // console.log("after edit if");
}
async function httpGetProduct(req, res) {
    console.log("req.url: ", req.url);
    console.log("req.params: ", req.params);
    const id = Number(req.params.id)
    const product = await getProductWithId(id)
    // res.end(JSON.stringify(product))
    res.json(product)
}

async function httpDeleteProduct(req, res) {
    const deletedProduct = await deleteProductWithId(req.params.id)
    res.end(JSON.stringify(deletedProduct))
}
module.exports = {
    httpSaveProduct,
    httpGetProducts,
    editproduct,
    httpGetProduct,
    httpDeleteProduct
}