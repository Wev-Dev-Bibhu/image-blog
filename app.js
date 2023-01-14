const dotenv = require("dotenv")
const express = require('express')
const app = express()

require('./db/conn')
app.use(express.json())
// Linking the router file
app.use(require('./router/auth'))
// const User = require('./model/userSchema')

dotenv.config({ path: './.env' })
const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})