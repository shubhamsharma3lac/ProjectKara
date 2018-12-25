const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSchema = new Schema({
    toUserId: { type: String, required: true },
    fromUserId: { type: String, required: true },
    content: { type: String, required: true },
    dateSent: { type: Date, required: true, default: Date.now() },
    dateRecieved: { type: Date },
    dateReaded: { type: Date }
})

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;