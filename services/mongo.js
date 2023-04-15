const mongoose = require('mongoose');
async function mongoConnect() {
    await mongoose.connect("mongodb://127.0.0.1:27017/restaurant")
}
mongoose.connection.on('error', function (error) {
    console.log("mongoose conection error ");
})
mongoose.connection.on('open', function () {
    console.log("mongoose is conected");
})
module.exports = mongoConnect  