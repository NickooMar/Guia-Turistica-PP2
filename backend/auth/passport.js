const passport = require("passport");
const passportLocal = require("passport-local");

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const bcrypt = require("bcryptjs");
const User = require("../models/User");

const LocalStrategy = passportLocal.Strategy;

passport.use(
  //Agregue passwordField
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    (email, password, done) => {
      User.findOne({ email }, (err, user) => {
        if (err) throw err;
        if (!user)
          return done(null, false, { message: "Incorrect email or password" });
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user, { message: "Logged In" });
          } else {
            return done(null, false);
          }
        });
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('auth-token'),
      secretOrKey: "123456",
    },
    function (jwtPayload, cb) {
      return User.findById(jwtPayload.user._id)
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

module.exports = passport;
