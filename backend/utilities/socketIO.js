let io;
module.exports = {
  init: (httpServer) => {
    io = require("socket.io")(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "PUT"],
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) throw new Error("Socket IO is not initialized");
    return io;
  },
};
