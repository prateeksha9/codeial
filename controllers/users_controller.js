const User = require('../models/users')

module.exports.profile = function(req,res){
    return res.render('users',{
        title: 'users'
    })
    
}

module.exports.posts = function(req,res){
    res.end('<h1>Posts are rendered</h1>')
}

module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('user_signup', {
        title: 'Codeial | Sign up'
    })
}

module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('user_signin', {
        title: 'Codeial | Signin'
    })
}

// Sign up data
module.exports.create=function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding user in signing up');
            return
        }
 
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log('Error in creating user');
                    return;
                }
                return res.redirect('/users/sign-in')
            })
        } else{
           return res.redirect('back');
        }
    })
}

// Sign in and create session for users
module.exports.createSession = function(req, res){
    return res.redirect('/');
}


module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}