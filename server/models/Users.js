const mongoose = require('mongoose')
const { Schema, model } = mongoose

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    occ: String,
    age: Number,
    gender: String
})

module.exports = model('User', UserSchema)