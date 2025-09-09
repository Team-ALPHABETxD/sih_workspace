const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const MONGO_URI = process.env.MONGO_URI
const connectToMongo = () => {
    mongoose.connect(MONGO_URI)
    .then((con) => console.log(`Connected to mongo: ${con.connection.host}`))
    .catch((err) => console.log(`Connection disrupted: ${err}`))
}

module.exports = connectToMongo