const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')

const authenticatePage = async (req, res, next) => {
    try {
        const token = req.query.token
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token })
        if (!rootUser) {
            res.status(500).json({ "message": "Please login first !! ", "status": "info" })
        }
        req.token = token
        req.rootUser = rootUser
        next()
    } catch (error) {
        res.status(401).send('Unauthorized Token')
        console.log(error)
    }
}

module.exports = authenticatePage