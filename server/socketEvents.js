exports = module.exports = function (io) {
  io.on("connection", function (socket) {
    socket.on("leave channel", function (channel) {
      socket.leave(channel);
    });
    socket.on("join", function (chatroom_id) {
      console.log("joining this room", chatroom_id);
      socket.join(chatroom_id);
    });
    socket.on("new message", function (msg) {
      socket.broadcast.to(msg.channelID).emit("new bc message", msg);
    });
    socket.on("new channel", function (channel) {
      socket.broadcast.emit("new channel", channel);
    });
    socket.on("typing", function (data) {
      socket.broadcast.to(data.channel).emit("typing bc", data.user);
    });
    socket.on("stop typing", function (data) {
      socket.broadcast.to(data.channel).emit("stop typing bc", data.user);
    });
    socket.on("new private channel", function (socketID, channel) {
      socket.broadcast.to(socketID).emit("receive private channel", channel);
    });
  });
};
