const Post = require('../models/post');
const User = require('../models/users');

// with asyn awaits

module.exports.home = async function(req, res){
    // populate the user of each post
    try{
        let posts =  await Post.find({})  // this is executed first
        .sort('-createdAt')
        .populate('user')
        .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });
    // .exec(function(err, posts){
       
    // })

    let users = await User.find({});    // then this is executed


             return res.render('home', {   // then this is executed
                title: "Codeial | Home",
                posts:  posts,
                all_users: users
            });

    } catch(err){
        console.log('err', err);
        return;

    }
    
        
}







    
// without asyn awaits
            // module.exports.home = function(req, res){
            //     // populate the user of each post
            //     Post.find({})
            //     .populate('user')
            //     .populate({
            //         path: 'comments',
            //         populate: {
            //             path: 'user'
            //         }
            //     })
            //     .exec(function(err, posts){
            //         User.find({}, function(err, users){
            //             User.find({}, function(err, users){
            //                 return res.render('home', {
            //                     title: "Codeial | Home",
            //                     posts:  posts,
            //                     all_users: users
            //                 });

            //             })
                        
            //         });
            //     })
            // }