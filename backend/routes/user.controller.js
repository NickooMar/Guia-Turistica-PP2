const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Autenticación
const passport = require("../auth/passport");
const jwt = require("jsonwebtoken");

const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const { email, username, password, confirmPassword } = req?.body;

  User.findOne({ $or: [{ email }, { username }] }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User already Exists");
    if (!doc) {
      if (password === confirmPassword) {
        try {
          const encryptedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({
            email,
            username,
            password: encryptedPassword,
          });

          await newUser.save();

          res.status(200);
        } catch (error) {
          return res.status(400).json({ message: "Error" });
        }
      } else {
        return res.status(400).json({ error: "Passwords doesn't match" });
      }
    }
  });
});

function authenticateUser(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    //Validación de posibles errores
    if (err || !user) {
      return res
        .status(400)
        .json({ message: "Something is not right", user: user });
    }

    //Creación del token
    req.login(user, { session: false }, (err) => {
      if (err) res.send(err);

      const token = jwt.sign({ user }, "123456", { expiresIn: "1h" });
      return res.json({ token: token });
    });
  })(req, res, next);
}

function getUser(req, res) {
  if (!req.user) {
    res.json({ username: "nobody" });
  }

  //Destructuring
  const { _id, username, email, places } = req.user;
  res.json({ _id, username, email, places });
}

const updateUser = asyncHandler(async (req, res) => {
  const { id, username, email } = req.body;

  console.log({ id, username, email });

  if (!id || !username || !email) {
    return res.status(400).json({ message: "Datos invalidos" });
  }

  const userFound = await User.findById(id).exec();

  console.log(userFound);

  const duplicate = await User.findOne({ email }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(400).json({ message: "Email duplicado" });
  }

  userFound.username = username;
  userFound.email = email;

  const updatedUser = await userFound.save();

  console.log(updatedUser);

  res.json({ message: `User: ${updatedUser?.username} updated` });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  console.log(id);

  if (!id) {
    return res.status(400).json({ message: "Se requiere el ID del usuario" });
  }

  const userToDelete = await User.findById(id).exec();

  if (!userToDelete) {
    return res
      .status(404)
      .json({ message: "No se encontro el usuario a eliminar" });
  }

  const userDeleted = await userToDelete.deleteOne();
  const response = `Usuario ${userDeleted.username} Eliminado`;

  res.json(response);
});

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
  updateUser,
  deleteUser,
  authenticateUser,
  getUser,
};
