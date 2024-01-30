const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Database MONGO DB ATLAS connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})
