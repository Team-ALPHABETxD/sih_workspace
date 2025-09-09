const mongoose = require('mongoose')
const { Schema, model } = mongoose

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String
})

module.exports = model(UserSchema, 'User')