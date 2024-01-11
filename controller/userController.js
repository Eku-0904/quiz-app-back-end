const UserModel = require('../database/schema/userSchema')
const bcrypt = require("bcrypt")

const createUser = async (req, res) => {
    const body = req.body;
    console.log(body)
    const password = body.password
    console.log(password)
    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = { ...body, password: hashedPassword };
    console.log(data)

    try {
        const user = await UserModel.create(data)
        res.status(200).send(user._id)
    } catch (err) {
        res.status(500).send("internal error")
    }

};

const loginUser = async (req, res) => {
    const body = req.body
    const user = await UserModel.findOne({ email: body.email })
    if (user) {
        res.status(200).send(user)
    } else {
        res.status(404).send("Not Found")
    }
}

const getUsers = async (req, res) => {
    const body = req.body;
    try {
        if (body.id) {
            const user = await UserModel.findById(body.id);
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send("not found")
            }
        } else {
            const users = await UserModel.find()
            res.status(200).send(users)
        }
    } catch (err) {
        res.status(500).send("internal error")
    }
}
module.exports = { createUser, loginUser }