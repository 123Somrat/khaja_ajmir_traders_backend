
import { Request, Response, NextFunction } from "express";
import dueValidationSchma from "../models/due/dueValidationSchema";
import {  ZodEffects, ZodObject } from 'zod';


const requestValidateSchema = (schma:ZodObject<any> | ZodEffects<ZodObject<any>>)=>{

     return async(
      req: Request,
      res: Response,
      next: NextFunction
    ) => {

      // extract data from request body
      const haveToValidateData = req.body.data;
        


      // Validating req body data
      const isValidated = await schma.safeParseAsync(haveToValidateData);
         
       
        // If req body is empty then throw a error
      if (isValidated.error?.errors[0].path.length === 0) {
        const errorsKey = Object.keys(haveToValidateData)
        const errors = errorsKey.map(err=>({path:err,message:`${err} is reqired`}))
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


}
    
    








  
  };









export default requestValidateSchema;
