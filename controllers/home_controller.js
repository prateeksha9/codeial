const Post = require('../models/post');

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user._id',25)

    // Post.find({}, function(err, posts){
    //     if(err){
    //         console.log("Cannot fetch posts")
    //     }
    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts : posts,
    //     });
    // })


    Post.find({}).populate('user').exec(function(err, posts){
        console.log(posts)
        if(err){
                    console.log("Cannot fetch posts", err)
                }
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts
        });
    })
    
}


module.exports.actionName = function(req, res){
    return res.end('<h1>ActionName</h1>')
}