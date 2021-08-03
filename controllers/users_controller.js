const User = require('../models/users')


module.exports.profile = function(req,res){
    // return res.render('users',{
    //     title: 'users'
    // })

    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err , user){
            if(user){
                return res.render('users',{
                    title: "User Profile",
                    user: user
                })
            }else{
                return res.redirect('/users/sign-in')
            }
        })

    }else{
        return res.redirect('/users/sign-in')
    }
    
}


module.exports.posts = function(req,res){
    res.end('<h1>Posts are rendered</h1>')
}



module.exports.signup = function(req,res){
    res.render('user_signup', {
        title: 'Codeial | Sign up'
    })
}


module.exports.signin = function(req,res){
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
    // find user
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Incorrect email');
            return
        }
        if(user){
            if(user.password != req.body.password){
                console.log('Incorrect Password')
                return res.redirect('back')
            }

            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');

        } else{
            return res.redirect('back')
        }
    })

    //handle user found
    
    // handle password mismatch

    // handle session creation

    // handle user not found
}