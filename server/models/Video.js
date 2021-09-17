const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = Schema({
   writer: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
   },
   createdAt: {
       type: Date,
       default : Date.now
   },
   title: {
       type: String,
       maxlength: 50
   },
   description: {
       type: String,
   },
   privacy: {
       type: Number
   },
   filepath: {
       type: String
   },
   category: {
        type: String
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }
}, { timestamp: true });


const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }