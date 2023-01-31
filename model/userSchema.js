const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    profileurl: {
        type: String,
    },
    likesPics: [{
        id: {
            type: String
        },
        updatedAt: {
            type: String
        },
        description: {
            type: String
        },
        altDescription: {
            type: String
        },
        userName: {
            type: String
        },
        firstName: {
            type: String
        },
        userProfileImg: {
            type: String
        },
        image: {
            type: String
        }
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// Hasing Password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next()
})

// generate auth token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token
    } catch (error) {
        console.log(error)
    }
}

userSchema.methods.saveLikedPhotos = async function (id, updatedAt, description, altDescription, userName, firstName, userProfileImg, image) {
    try {
        const userLogin = await User.findOne({ 'likesPics.id': id })
        if (!userLogin) {
            this.likesPics = this.likesPics.concat({
                id: id,
                updatedAt: updatedAt,
                description: description,
                altDescription: altDescription,
                userName: userName,
                firstName: firstName,
                userProfileImg: userProfileImg,
                image: image
            })
            await this.save()
        }
    } catch (error) {
        return error
    }
}

userSchema.methods.uploadProfilePhoto = async (username, imgId) => {
    try {
        let profileImageUrl
        if (imgId != "NULL") {
            profileImageUrl = "https://drive.google.com/uc?id=" + imgId
        } else {
            profileImageUrl = "NULL"
        }
        const res = await User.findByIdAndUpdate(username, { 'profileurl': profileImageUrl }, { new: true })
        if (res) {
            return res.profileurl
        } else {
            "error"
        }
    } catch (error) {
        return error
    }
}
const User = mongoose.model('USER', userSchema)
module.exports = User