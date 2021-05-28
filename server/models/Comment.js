const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    },
    replyTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
    },
}, { timestamp: true });

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = { Comment }