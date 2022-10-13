const mongoose = require('mongoose');
// const User = require('./User');


const PlaceSchema = new mongoose.Schema({
    title:{type: String, required:true},
    description: {type: String, required:true},
    date: { type: Date, default: Date.now},
    user: {type: String}
})

module.exports = mongoose.model('Place', PlaceSchema);