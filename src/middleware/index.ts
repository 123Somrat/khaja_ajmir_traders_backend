import app from "../app";
import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";
import router from "../routes";

const middleWare = (app: Application) => {
  app.use(cors());
  app.use(express.json());
  app.use(router);
};

app.use((err:any, req: Request, res: Response, next: NextFunction) => {
  next();
  res.status(err.status).json({
    status: err.status || 500,
    code: err.code || "Internal server error",
    message: err.message || "Opps something wrong in our site",
  });
});

export default middleWare;
