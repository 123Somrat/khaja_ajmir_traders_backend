import { Request, Response, NextFunction } from "express";
import { ZodEffects, ZodObject } from "zod";
import zodUserValidationSchema from "../models/user/zodUserValidationSchema";
import dueValidationSchma from "../models/due/dueValidationSchema";

const requestValidateSchema = (
  schma: ZodObject<any> | ZodEffects<ZodObject<any>>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // extract data from request body
    const haveToValidateData = req.body.data;
    const schemas = [zodUserValidationSchema, dueValidationSchma];
    const haveToValidateSchemas = schemas.find((schemas) => schma === schemas);

    // if user pass empty body or empty data object then chose the schema for throwing error
    const schema =
      typeof (req.body || req.body.data) === "undefined" ||
      JSON.stringify(req.body) === "{}"
        ? haveToValidateSchemas
        : haveToValidateData;

    // Validating req body data
    const isValidated = await schma.safeParseAsync(schema);

    // If req.body is or req.body.data empty then throw a error with required feild
    if (isValidated.error?.errors[0].path.length === 0) {
      const errorsKey = Object.keys(haveToValidateData);
      const errors = errorsKey.map((err) => ({
        path: err,
        message: `${err} is reqired`,
      }));
      return res.status(400).json({ staus: 400, code: "Bad request", errors });
    }

    // Throwing error
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
};

export default requestValidateSchema;
