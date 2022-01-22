const Emitter = require("events");

module.exports = (app, io) => {
  const eventEmitter = new Emitter();
  app.set("eventEmitter", eventEmitter);

  eventEmitter.on("new_message", (emit) => {
    console.log("going to emit new_message", emit);
    io.to(emit.roomId).emit("new_message", emit.message);
  });

  eventEmitter.on("new_status", (emit) => {
    console.log("going to emit new_status", emit);
    io.to(emit.contractId).emit("new_status", emit.status);
  });
};
