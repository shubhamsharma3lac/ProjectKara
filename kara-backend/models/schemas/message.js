const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messageSchema = new Schema({
    toUserId: { type: string, required: true },
    fromUserId: { type: string, required: true },
    content: { type: string, required: true },
    dateSent: { type: Date, required: true, default: Date.now() },
    dateRecieved: { type: Date, required: true },
    dateReaded: { type: Date, required: true }
})

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;