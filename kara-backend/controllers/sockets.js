const server = require('../app');
const io = require('socket.io').listen(server);

const User = require('../models/schemas/users');

io.sockets.on('connection', function (client) {
    client.on('message:client', function (data) {
        // Broadcast message to all clients expect the sender itself
        client.broadcast.emit('message:server', { message: data.message });
    })

    client.on('fetch:users:client', async function (data) {
        var users = await getUsersAsync();
        client.emit('fetch:users:server', { users: users })
    })

    client.on('send:message:client', function(data){
        //TODO: save message to database
        client.broadcast.emit('send:message:server', { message: data })
    })
});

async function getUsersAsync() {
    return await User.find({}).exec()
}