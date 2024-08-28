import http from "http";
import app from "./app";
import middleWare from "./middleware";
import connectDb from "./db/connectDb";
import './lib/cronJobs/index'

const server = http.createServer(app);
const port = process.env.PORT || 5000;

// middleware
middleWare(app);

// application strat
const main = async () => {
  await connectDb();
  server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
};

main();
