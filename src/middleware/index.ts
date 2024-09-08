import app from "../app";
import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";
import router from "../routes";
import HttpError from "../utils/customError";

// CORS options
const corsOptions = {
  origin: "http://127.0.0.1:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const middleWare = (app: Application) => {
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(router);

  app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status).json({
      status: err.status || 500,
      code: err.code || "Internal server error",
      message: err.message || "Opps something wrong on our side",
    });
  });
};
export default middleWare;
