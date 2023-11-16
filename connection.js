const mongoose = require('mongoose')

async function ConnectMongdb(url) {

    // >> Connecting node.js server with Mongodb
    return mongoose.connect(url) // they are returning promise



}
module.exports = { ConnectMongdb }