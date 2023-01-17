const jwt = require('jsonwebtoken')
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
require('../db/conn')
const User = require('../model/userSchema')
const authenticatePage = require('../middleware/authenticate')

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://image-blog-site.netlify.app") // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "https://image-blog-site.netlify.app/signin") // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "https://image-blog-site.netlify.app/signup") // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "https://image-blog-site.netlify.app/about") // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "https://image-blog.onrender.com/about") // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "https://image-blog.onrender.com/about/signin") // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "https://image-blog.onrender.com/about/signup") // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "https://image-blog.onrender.com/about/about")
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})


router.post('/signup', async (req, res) => {
    const { username, email, gender, phone, password, cpassword } = req.body
    if (!username || !email || !gender || !phone || !password || !cpassword) {
        return res.status(422).json({ "message": "Please fill all details !!", "status": "error" })
    } else if (password != cpassword) {
        return res.status(422).json({ "message": "Password doesn't match", "status": "error" })
    } else {
        try {
            const userExist = await User.findOne({ email: email })
            if (userExist) return res.status(422).json({ "message": "Email Already Present", "status": "error" })
            const user = new User({ username, email, gender, phone, password, cpassword })
            // Saving into DB
            await user.save()
            res.status(201).json({ "message": "User Registered Successfully", "status": "success" })

        } catch (err) {
            res.status(500).json({ "message": "Failed to Register: ", "status": "error" })
        }
    }
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        let token
        if (!email || !password) return res.status(400).json({ "message": "Please fill all details!!", "status": "error" })
        const userLogin = await User.findOne({ email: email })
        if (userLogin) {
            const checkPasword = await bcrypt.compare(password, userLogin.password)
            token = await userLogin.generateAuthToken()
            checkPasword ? res.status(200).json({ "message": "Signin Success ", "status": "success", "token": token }) : res.status(400).json({ "message": "Invalid Credentials", "status": "error" })
        } else {
            res.status(400).json({ "message": "Invalid Credentials", "status": "error" })
        }
    } catch (err) {
        res.status(500).json({ "message": "Failed to Login: ", "status": "error" })
    }
})

router.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' })
    }
    const file = req.files.file

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    })
})


router.get('/about', authenticatePage, (req, res) => {
    res.send(req.rootUser)
})


module.exports = router