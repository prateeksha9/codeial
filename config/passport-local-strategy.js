const passport = require('passport');
console.log('passport is loaded now');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');


// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email, password, done){  // email and password are automatically passed
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  {
            if (err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            console.log(`############## ${user}`);
            if (!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);  // returned to failureRedirect in users.js
            }

            return done(null, user);  // user is returned to passport.serializeUser()
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    console.log(`************** ${user}`);
    console.log(user.id, 'and   ', user._id);  // both are same
    done(null, user.id);   // user.id is sent to session in index.js to encript cookie
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});


// check if user is authenticated
//using this as a middleware
passport.checkAuthentication = function(req, res, next){
    // if authenticated pass request to next function(controeller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if not authenticated
    return res.redirect('/users/sign-in')
}


passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated){
        // req.user contains the current signed in user from the session cookie
        // and we just sending it to locals for views
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;

























// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/users');


// // Authentication using passport
// passport.use(new LocalStrategy({
//     usernameField: 'email'
// },
// function(email, password, done){
// //  find a user and establish identity
// User.findOne({email: email}, function(err, user){
//     if(err){
//         console.log('User not found')
//         return done(err);
//     }

//     if(!user || user.password != password){
//         console.log('Invalid Username / Password');
//         return done(null, false);
//     } 
//         return done(null,user);
    
// })

// }

// ));

// // Serializing the user to decide which key is to be kept in cookies

// passport.serializeUser(function(user,done){
//     done(null, user.id);
// })

// // After sign in.. cookie is sent to browser and browser deserializes it


// // Deserializing the user from the key in the cookies

// passport.deserializeUser(function(id,done){
//     users.findById(id, function(err,user){
//         if(err){
//             console.log('User not found')
//         }

//         return done(null, user);

//     });
// })


// module.exports = passport;