const jwt = require('jsonwebtoken')
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const multer = require("multer");
const path = require("path");
const stream = require('stream');
const { google } = require("googleapis");
require('../db/conn')

const User = require('../model/userSchema')
const authenticatePage = require('../middleware/authenticate');
// const { Stream } = require('stream');
const upload = multer()
const KEYFILEPATH = path.join(__dirname, "credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
})

const uploadFile = async (fileObject, userID) => {
    try {
        const bufferStream = new stream.PassThrough();
        bufferStream.end(fileObject.buffer);
        const { data } = await google.drive({ version: "v3", auth }).files.create({
            media: {
                mimeType: fileObject.mimeType,
                body: bufferStream,
            },
            requestBody: {
                name: fileObject.originalname,
                parents: ["1zeAH9hKQyXb8o2Irac7mJWlIhLVWC31-"],
            },
            fields: "id,name",
        });
        console.log(`Uploaded file ${data.name} ${data.id} ${userID}`)
        const userLogin = await User.findOne({ username: userID })
        const imgUrl = await userLogin.uploadProfilePhoto(userLogin._id, data.id)
        return imgUrl
    } catch (error) {
        return error
    }
};

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Origin");
    next();
});


router.post('/signup', async (req, res) => {
    const { username, fullname, email, gender, phone, password, cpassword } = req.body
    if (!username || !fullname || !email || !gender || !phone || !password || !cpassword) {
        return res.status(422).json({ "message": "Please fill all details !!", "status": "error" })
    } else if (password != cpassword) {
        return res.status(422).json({ "message": "Password doesn't match", "status": "error" })
    } else {
        try {
            const userMailExist = await User.findOne({ email: email })
            const userNameExist = await User.findOne({ email: email })
            if (userMailExist) return res.status(422).json({ "message": "Email Already Present", "status": "error" })
            if (userNameExist) return res.status(422).json({ "message": "Username Already Present", "status": "error" })
            const user = new User({ username, email, gender, phone, password, cpassword, fullname })
            // Saving into DB
            await user.save()
            res.status(201).json({ "message": "User Registered Successfully", "status": "success" })

        } catch (err) {
            res.status(500).json({ "message": "Failed to Register: ", "status": "error" })
        }
    }
})

router.post('/signin', async (req, res) => {
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    try {
        const { email, password } = req.body
        let token
        if (!email || !password) return res.status(400).json({ "message": "Please fill all details!!", "status": "error" })
        const userLogin = await User.findOne({ email: email })
        if (userLogin) {
            const checkPasword = await bcrypt.compare(password, userLogin.password)
            token = await userLogin.generateAuthToken()
            checkPasword ? res.status(200).json({ "message": "Signin Success ", "status": "success", "token": token, "userID": userLogin.username, "imgUrl": userLogin.profileurl }) : res.status(400).json({ "message": "Invalid Credentials", "status": "error" })
        } else {
            res.status(400).json({ "message": "Invalid Credentials", "status": "error" })
        }
    } catch (err) {
        res.status(500).json({ "message": "Failed to Login: ", "status": "error" })
    }
})

router.post('/upload', upload.any(), async (req, res) => {
    try {
        const { files } = req
        const { userID } = req.body
        const imgUrl = await uploadFile(files[0], userID)
        if (imgUrl) {
            res.status(200).json({ "message": "Profile Updated ", "status": "success", "imgUrl": imgUrl })
        } else {
            res.status(400).json({ "message": "Upload Failed ", "status": "error" })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ "message": "Upload Failed ", "status": "error" })
    }
})


router.get('/dashboard', authenticatePage, (req, res) => {
    res.send(req.rootUser)
})

router.get('/likedpics/:userID', async (req, res) => {
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    try {
        const userID = req.params.userID
        const userLogin = await User.findOne({ username: userID })
        res.status(200).send(userLogin.likesPics)
    } catch (error) {
        console.log(error)
    }
})

router.post('/like', async (req, res) => {
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    try {
        const { id, updatedAt, description, altDescription, userName, firstName, userProfileImg, image, username } = req.body
        const userLogin = await User.findOne({ username: username })
        if (userLogin) {
            await userLogin.saveLikedPhotos(id, updatedAt, description, altDescription, userName, firstName, userProfileImg, image)
            res.status(200).json({ "message": "Success", "status": "success" })
        } else {
            res.status(400).json({ "message": "No User *Found", "status": "error" })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({ "message": "Error", "status": "error" })
    }
})


module.exports = router