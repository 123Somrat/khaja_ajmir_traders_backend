import http from "http";
import app from "./app";
import middleWare from "./middleware";
import connectDb from "./db/connectDb";
import "./lib/cronJobs/index";
import { initSocketServer } from "./socket/socket";
import { expiredNotifications } from "./socket/events/expiredDueNotifications";

//Http server
const httpserver = http.createServer(app);

//Port
const port = process.env.PORT || 5000;

// middleware
middleWare(app);
const io = initSocketServer(httpserver);
const expiredDueNotifications = expiredNotifications();

// application strat
const main = async () => {
  await connectDb();
  httpserver.listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
};

main();
// Initialize Socket.IO with type safety

export { httpserver, io, expiredDueNotifications };
