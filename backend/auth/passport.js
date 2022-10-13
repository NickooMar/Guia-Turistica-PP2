const passport = require('passport');
const passportLocal = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const LocalStrategy = passportLocal.Strategy;

passport.use(
    new LocalStrategy({usernameField: 'email'}, (email, password, done) =>{
        User.findOne({ email }, (err, user) => {
            if(err) throw err;
            if(!user) return done(null, false);
            bcrypt.compare(password, user.password, (err, result) => {
                if(err) throw err;
                if(result === true){
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }) 
        })

        passport.serializeUser((user, cb) => {
            cb(null, user._id);
        })

        passport.deserializeUser((id, cb) => {
            User.findOne({_id: id}, (err, user) => {
                const userInformation = {
                    email: user.email,
                    username: user.username,
                    id: user._id
                };
                cb(err, userInformation);
            })
        })


    })
)


module.exports = passport;