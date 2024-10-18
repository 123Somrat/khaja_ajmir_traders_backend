import http from "http";
import app from "./app";
import middleWare from "./middleware";
import connectDb from "./db/connectDb";
import "./lib/cronJobs/index";
import { Server, Socket } from "socket.io";
import HttpError from "./utils/customError";
import tokenService from "./lib/token";
import { NextFunction } from "express";
import { parse } from "url";
const server = http.createServer(app);
const port = process.env.PORT || 5000;

// middleware
middleWare(app);

// websocket server connection
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

//Created NameSpace for ExpiredDueNotifications
const expiredDueNotifications = io.of('/expiredDueNotifications')





// Middleware to validate WebSocket connection requests by checking the query token.
// If token is "abc", the WebSocket upgrade is allowed; otherwise, the request is denied with a 401 Unauthorized response.
io.engine.use((req: any, res: any, next: any) => {
  const token = req._query.token; // Extract token from query string

  // Example token validation
  if (token === "abcd") {
    next(); // Allow WebSocket upgrade
  } else {
    console.log("Unauthorized request for WebSocket upgrade");
    res.writeHead(401, "Unauthorized"); // Send 401 and close connection
    res.end("Unauthorized");
  }
});


// Listening connection for expiredDueNotifications
expiredDueNotifications.on("connection", (Socket) => {
  console.log("User connected with expiredDueNotifications socket");

  Socket.on("disconnect", () => {
    console.log("user disconnected from expiredDueNotifications  socket");
  });
});

// application strat
const main = async () => {
  await connectDb();
  server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
};

main();

export default expiredDueNotifications;
