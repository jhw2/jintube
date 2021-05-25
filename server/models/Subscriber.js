const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriberSchema = Schema({
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, { timestamp: true });

const Subscriber = mongoose.model('Subscriber', SubscriberSchema);
module.exports = { Subscriber }