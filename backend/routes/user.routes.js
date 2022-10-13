const express = require("express");
const passport = require("../auth/passport");
const userController = require("./user.controller");

const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const router = express();

router.post("/register", userController.createUser);
router.post("/login", passport.authenticate("local"), userController.loginUser);
router.post("/logout", userController.logout);
router.get("/user", userController.getUser);

module.exports = router;
