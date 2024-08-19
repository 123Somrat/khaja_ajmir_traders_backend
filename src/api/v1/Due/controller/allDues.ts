import asyncHandeler from "../../../../utils/asyncHandeler";
import { Request , Response , NextFunction } from "express";
import dueSercice from '../../../../lib/due'
const allDues =async (req:Request,res:Response,next:NextFunction)=>{


    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sortType = req.query.sort as string || 'dsc';
    const sortBy = req.query.sortBy as string || 'date'
    const searchBy = req.query.searchBy as string || ''





// Call allDues service for getting all dues from db
const allDue =await dueSercice.allDues(page,limit,sortType,sortBy,searchBy)

// Count total items depends on search for pagination
const totalItems = dueSercice.count(searchBy)

   res.status(200).json({
       status:200,
       code:'OK',
       message:'Data retrived succesfully',
       allDue:allDue
    
   })


}


export default allDues;