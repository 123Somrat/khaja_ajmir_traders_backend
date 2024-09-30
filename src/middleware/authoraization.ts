import { Request, Response, NextFunction} from "express";

type role = "admin" | "user";
type roles = role[];

const authoraization = 
(role: roles) => 
 (req : Request, _res:Response, next:NextFunction) => {
      
   // console.log(req)
 


};

export default authoraization;
