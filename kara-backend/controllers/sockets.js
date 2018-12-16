const server = require('../app');
const io = require('socket.io').listen(server);

io.sockets.on('connection', function(client){
    client.on('message:client', function(data){
        // Broadcast message to all clients expect the sender itself
        client.broadcast.emit('message:server', { message: data.message});
    })
});