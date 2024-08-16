import { Request, Response, NextFunction } from "express";
import dueValidationSchma from "../models/due/dueValidationSchema";

const requestValidateSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const haveToValidateData = req.body.dueData;

  const isValidated = dueValidationSchma.safeParse(haveToValidateData);

  if (isValidated.error?.errors[0].path.length === 0) {
    const errors = [
      {
        path: "buyerName",
        message: "BuyName can not be empty",
      },
      {
        path: "sellerName",
        message: "Seller name can not empty",
      },
      {
        path: "buyingPrice",
        message: "Number must be greater than 0",
      },
      {
        path: "buyingDate",
        message: "Buying date can not be smaller then today"
    },
    {
        path: "expiredDate",
        message: "Expired date can not be smaller then today"
    }
    ];

    return res.status(400).json({ staus: 400, code: "Bad request", errors });
  }

  if (!isValidated.success) {
    const errors = isValidated.error?.errors.map((error) => {
      return {
        path: error.path[error.path.length - 1],
        message: error.message,
      };
    });
    return res.status(400).json({ staus: 400, code: "Bad request", errors });
  } else {
    next();
  }
};

export default requestValidateSchema;
