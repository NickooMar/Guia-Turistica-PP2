const express = require("express");
const passport = require("../auth/passport");
const userController = require("./user.controller");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const router = express();

router.post("/register", userController.createUser);

// Ejecutamos el controller en el mismo archivo solo para validar que funcione el login como en el ejemplo
router.post("/login", function (req, res, next) {
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
});

router.post("/logout", userController.logout);

router.get(
  "/user",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    if (!req.user) {
      res.json({ username: "nobody" });
    }

    //Destructuring
    const { username, email, _id } = req.user;
    res.json({ username, email, _id });
  }
);

module.exports = router;
