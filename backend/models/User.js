const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email: { type: String, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model('User', user);