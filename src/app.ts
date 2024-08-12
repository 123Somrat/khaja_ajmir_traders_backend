import express from "express";
import dotenv from 'dotenv'

const app = express();
dotenv.config()



app.get("/health", (_req, res) => {
  res.json({
    health: "OK",
    message: "Boddha biaggin tik tak,Tui ham gor",
    code: 200,
  });
});




export default app;
