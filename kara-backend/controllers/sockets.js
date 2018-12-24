const server = require('../app');
const io = require('socket.io').listen(server);
var Message = require('../models/schemas/message');

const User = require('../models/schemas/users');

io.sockets.on('connection', function (client) {
    client.on('message:client', function (data) {
        // Broadcast message to all clients expect the sender itself
        client.broadcast.emit('message:server', { message: data.message });
    })

    client.on('fetch:users:client', async function (data) {
        var users = await getUsersAsync(data._id);
        client.emit('fetch:users:server', { users: users })
    })

    client.on('send:message:client', (data) => {
        //TODO: save message to database
        var message = new Message();
        Object.keys(data.message).forEach((key) => {
            message[key] = data.message[key];
        })

        message.save(function (err, result) {
            if (err) {
                return console.log(err);
            }

            io.to(data.socketId).emit('send:message:server', { message: data.message });
        })
    })

    client.on('fetch:messages:client', async function (data) {
        var messages = await Message.find({ $or: [{ fromUserId: data._id }, { toUserId: data._id }] }).exec();
        client.emit('fetch:messages:server', { messages: messages });
    })

    client.on('update:user:socketId:client', function (data) {
        var userId = data.userId;
        User.findById(userId, function (err, result1) {
            result1.socketId = client.id;
            result1.save(function (err, result2) {
                if (err) {
                    console.log(err);
                }
            })
        })
    })
});

async function getUsersAsync(id) {
    return await User.find({ _id: { $ne: id } }).exec()
}