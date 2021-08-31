const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "3316314963-14b3d66g4p18sh8i2vs8lic6gonl608q.apps.googleusercontent.com",
    clientSecret: "z5EEGs7w-DrPblo_6A3leMur",
    callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken, refreshToken, profile, done){

        // find user user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google strategy Passport', err);
                return;
            }
            console.log(profile);
            console.log(accessToken, refreshToken);
            if(user){
                // if user is found, set this user as req.user
                return done(null, user)
            } else{
                // create a new user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                }, function(err, user){
                    if(err){
                        console.log('error in creating user using google strategy Passport', err);
                        return;
                    } else{
                        return done(null,user)
                    }
                })
            }
        })
    }

))



module.exports = passport;
