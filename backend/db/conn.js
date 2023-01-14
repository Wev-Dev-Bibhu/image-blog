const dotenv = require("dotenv")
const mongoose = require('mongoose')

dotenv.config({ path: './.env' })
const DB = process.env.DATABASE

mongoose.set('strictQuery', false);
mongoose.connect(DB).then(() => {
    console.log('Connected to DataBase')
}).catch((err) => console.log('Connection Error: \n' + err))