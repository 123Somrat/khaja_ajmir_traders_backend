import http from "http";
import app from "./app";
import cors from "cors";
import express from "express";

const server = http.createServer(app);
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// application strat
const main = () => {
  server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
  });
};

main();
