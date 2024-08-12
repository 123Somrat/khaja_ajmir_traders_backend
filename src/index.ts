import http from "http";
import app from "./app";
import middleWare from "./middleware";

const server = http.createServer(app);
const port = process.env.PORT || 5000;

// middleware
middleWare(app)


// application strat
const main = () => {
  server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
};

main();
