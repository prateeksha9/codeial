// same as before... No edits required

const User = require('../models/users')

module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('users',{
            title: 'users Profile',
            profile_user : user
        });
    })
}


module.exports.update = async function(req, res){
    try{
        if(req.user.id == req.params.id){
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('Multer Error:', err)
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){
                    // saving the path of uploaded file into avatar field in user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            }) 
        } else{
            req.flash('error', 'Unauthorized');
            return res.status(401).send('Unauthorized');
        }
    } catch(error){
        req.flash('error', error);
        return res.redirect ('back');
    }
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
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}


module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('Success', 'Logged out Successfully');
    return res.redirect('/');
}