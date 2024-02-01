const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

console.log(process.env.MONGO_URI);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Database MONGO DB ATLAS connected'))
.catch(err => console.error(`DB connection error: ${err.message}`))


module.exports = mongoose;