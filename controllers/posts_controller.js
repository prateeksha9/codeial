const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        console.log(req.user)
        await Post.create({      
        content: req.body.content,
        user: req.user._id
    });
        req.flash('success', 'Post Published!');
        return res.redirect('back');
    } catch(err){
        req.flash('error', err);
        return res.redirect('back');

    }
    
}


module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            // .id means converting ID to string
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            req.flash('success', 'Post deleted successfully!');
            return res.redirect('back');
        } else{
            req.flash('error', err);
            return res.redirect('back');
        }

    } catch(err){
        console.log('err', err);

    }
    
}