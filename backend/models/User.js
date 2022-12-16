const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: { type: String, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  places: [
    {
      placeID: String,
      name: String,
      rating: Number,
      price: String,
      ranking: String,
      image: String,
      phone: String,
      savedAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("User", user);
