const { Router } = require('express');
const router = Router()
const { createUser, loginUser } = require('../controller/userController');
const UserModel = require('../database/schema/userSchema')
const bcrypt = require("bcrypt")

const validateInput = async (req, res, next) => {
    const body = req.body
    console.log(body)
    const user = await UserModel.findOne({ email: body.email })
    console.log(user)
    if (user) {
        res.status(404).send("email is already used")
    } else {
        next();
    }
}

const validatePassword = async (req, res, next) => {
    const body = req.body
    const user = await UserModel.findOne({ email: body.email })
    if (user) {
        const isPasswordCorrect = bcrypt.compareSync(body.password, user.password)
        if (isPasswordCorrect) {
            next();
        } else {
            res.status(404).send("password is incorrect")
        }
    }
    else {
        res.status(404).send("user not found")
    }
}
// midleware gold ni bicne
router.post('/signup', validateInput, createUser)
router.post('/login', validatePassword, loginUser)

module.exports = router
