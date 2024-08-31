import { Request, Response, NextFunction, RequestHandler } from "express";

const asyncHandeler = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) =>next(err));
  };
};

export default asyncHandeler;
