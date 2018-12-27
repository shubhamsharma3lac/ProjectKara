const server = require("../app");
const io = require("socket.io").listen(server);
var Message = require("../models/schemas/message");

const User = require("../models/schemas/users");

io.sockets.on("connection", function(client) {
  client.on("message:client", function(data) {
    // Broadcast message to all clients expect the sender itself
    client.broadcast.emit("message:server", { message: data.message });
  });

  client.on("fetch:users::client", async function(data) {
    let userId = data.userId;
    let users = User.find({ _id: { $ne: userId } }, function(err, result) {
      if (err) {
        return console.log(err);
      }

      client.emit("fetch:users::server", { users: users });
    });
  });

  client.on("send:message::client", data => {
    //TODO: save message to database
    var message = new Message();
    Object.keys(data.message).forEach(key => {
      message[key] = data.message[key];
    });

    message.save(function(err, result) {
      if (err) {
        return console.log(err);
      }

      io.to(data.socketId).emit("send:message::server", {
        message: data.message
      });
    });
  });

  client.on("fetch:messages::client", async function(data) {
    var messages = await Message.find({
      $or: [{ fromUserId: data.userId }, { toUserId: data.userId }]
    }).exec();
    client.emit("fetch:messages::server", { messages: messages });
  });

  client.on("update:user:socketId::client", function(data) {
    let userId = data.userId;
    let socketId = data.socketId;
    User.findById(userId, function(err, user) {
      if (err) {
        return console.log(err);
      }

      user.socketId = socketId;
      user.save(function(err, user) {
        if (err) {
          return console.log(err);
        }

        client.broadcast.emit("update:user:socketId::server", {
          userId: user._id,
          socketId: user.socketId
        });
      });
    });
  });

  client.on("message:typing:start::client", function(data) {
    let userId = data.userId;
    let socketId = data.socketId;
    io.to(socketId).emit("message:typing:start::server", {
      userId: userId,
      socketId: socketId
    });
  });

  client.on("message:typing:stop::client", function(data) {
    let userId = data.userId;
    let socketId = data.socketId;
    io.to(socketId).emit("message:typing:stop::server", {
      userId: userId,
      socketId: socketId
    });
  });
});
