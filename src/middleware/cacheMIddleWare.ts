import { Request, Response, NextFunction } from "express";

const cacheMiddleware =
  (cache_type: string, max_age: string) =>
  async (_req: Request, res: Response, next: NextFunction) => {
    res.set({
      "Cache-Control": `${cache_type},max-age=${max_age}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-origin": "http://localhost:5173",
    });

    next();
  };

export default cacheMiddleware;
