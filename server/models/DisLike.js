const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DisLikeSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }
}, { timestamp: true });

const DisLike = mongoose.model('DisLike', DisLikeSchema);
module.exports = { DisLike }