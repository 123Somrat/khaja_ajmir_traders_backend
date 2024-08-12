import { Request , Response , NextFunction } from "express"


const addDue = (req:Request,res:Response,next:NextFunction)=>{
    res.status(200).json({
         status:200,
         code : "Ok",
         message: 'data is comeing'
    })
}

export default addDue