const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const { email, username, password, confirmPassword } = req?.body;

  User.findOne({ $or: [{ email }, { username }] }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User already Exists");
    if (!doc) {
      if (password === confirmPassword) {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          email,
          username,
          password: encryptedPassword,
        });

        await newUser.save();

        res.send("success");

        console.log(newUser);
      } else {
        return res.status(400).json({ error: "Passwords doesn't match" });
      }
    }
  });
};

const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send("success");
  });
};

module.exports = {
  createUser,
  logout,
};
