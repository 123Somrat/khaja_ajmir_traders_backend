import { Request, Response, NextFunction } from "express";
import HttpError from "../utils/customError";

type role = "admin" | "user";
type roles = role[];

const authoraization =
  (role: roles) => (req: Request, _res: Response, next: NextFunction) => {
    const userRole = req.body.user.role;

    if (!role.includes(userRole)) {
      throw new HttpError(403, "Forbidden", "Access denied");
    }

    if (role.includes(userRole)) {
      next();
    }
  };

export default authoraization;
