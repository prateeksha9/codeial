const mongoose = require('mongoose');

const postSchema =  new mongoose.Schema({
    content:{
        type: String,
        required: true, 
    },
    user: {
        // refer to user database/collection
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    // inlude the array of ids of all comments in this post chema itself
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }]
},{
    timestamps: true,
});

const Post = mongoose.model('POST', postSchema);
module.exports = Post;