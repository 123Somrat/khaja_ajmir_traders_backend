import asyncHandeler from "../../../../utils/asyncHandeler";
import { Request , Response , NextFunction } from "express";

const allDues = (req:Request,res:Response,next:NextFunction)=>{

    const query = req.query;
    console.log(query)

   res.status(200).json({
       status:200,
       code:'OK',
       message:'Data retrived succesfully',
    
   })


}


export default allDues;