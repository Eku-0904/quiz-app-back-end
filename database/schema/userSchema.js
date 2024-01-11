const { model, Schema} = require('mongoose');

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    picture: String,
    location: String,
    age: Number,
})

const UserModel = model("User", UserSchema);

module.exports = UserModel;