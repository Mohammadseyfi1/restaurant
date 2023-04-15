const app = require('./app');
const mongoConnect = require('./services/mongo');
const http = require("http")

const server = http.createServer(app)

async function start() {
    await mongoConnect()
    server.listen(3000, function () {
        console.log("server is listening on port 3000");
    })
}

start()

