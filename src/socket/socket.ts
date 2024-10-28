import http from "http";
import socketMiddleware from "./middleware";
import { Server } from "socket.io";

// Initialize the socket
const initSocketServer = (httpserver: http.Server) => {
  let io = new Server(httpserver, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  socketMiddleware(io)
  return io;
};

// socketMiddleware
//socketMiddleware(io)

export { initSocketServer };
