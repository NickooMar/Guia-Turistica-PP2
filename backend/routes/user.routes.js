const express = require("express");
const passport = require("../auth/passport");
const userController = require("./user.controller");

const router = express();

router.post("/register", userController.createUser);
// Ejecutamos el controller en el mismo archivo solo para validar que funcione el login como en el ejemplo
router.post("/login", userController.authenticateUser);
router.post("/logout", userController.logout);
router.get("/user", passport.authenticate("jwt", {session: false}), userController.getUser);
router.patch("/user", userController.updateUser);
router.delete("/user", userController.deleteUser);

module.exports = router;
