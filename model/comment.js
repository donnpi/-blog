const mongoose = require('mongoose');

const commentShema = new mongoose.Schema({
    //文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    //评论者的id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date
    },
    content: {
        type: String
    }
});

const Comment = mongoose.model('Comment', commentShema);

module.exports = {
    Comment
}