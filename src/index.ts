import http from "http";
import app from "./app";
import middleWare from "./middleware";
import connectDb from "./db/connectDb";
import "./lib/cronJobs/index";
import { Server } from "socket.io";
import HttpError from "./utils/customError";
import tokenService from "./lib/token";
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

// Add auth medial for secure connection
// io.use(async (socket, next) => {
//   try {
//     const token = socket.handshake.query.token as string;
//     if (!token) {
//       throw new HttpError(401, "Unauthorized", "Acess denied");
//     }

//     if (token) {
//       const verifiedToken = await tokenService.verifyToken(token);

//       if (!verifiedToken) {
//         throw new HttpError(401, "Unauthorized", "Acess denied");
//       }
//       next();
//     }
//   } catch (err) {
//     if (err instanceof HttpError) {
//       throw new HttpError(err.status, err.code, err.message);
//     }
//   }
// });

// web socket connection
io.on("connection", (Socket) => {
  console.log("User connected with wocket");

  Socket.on("disconnect", () => {
    console.log("user disconnected from web socket");
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

export default io;
