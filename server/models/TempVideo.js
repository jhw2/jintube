const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TempVideoSchema = Schema({
    filepath: {
        type: String
    },
    thumbnail: {
        type: String
    },
    expiryDate: {
        type: Date,
        default : new Date(Date.now() + 60 * 60 * 1000 * 24) //만료기한 1일
    }
}, { timestamp: true });

const TempVideo = mongoose.model('TempVideo', TempVideoSchema);
module.exports = { TempVideo }