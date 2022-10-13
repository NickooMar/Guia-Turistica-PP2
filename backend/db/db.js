const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Connection BD Done'))
    .catch((err) => console.log(err));
};


module.exports = connectDB;