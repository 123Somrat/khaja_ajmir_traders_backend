import { RequestHandler } from "express";
import asyncHandeler from "../../../../utils/asyncHandeler";
import dueService from '../../../../lib/due'
const getSingleDue:RequestHandler = asyncHandeler(async(req,res,next)=>{

    // Ectrect dueId from req.params
  const dueId = req.params.id;

  // Call getSingleDue service to get the due from db
  const due = await dueService.getSingleDue(dueId)
 
   
  res.status(200).json({
      status:200,
      code:'Ok',
      message:'Due retrived successfully',
      data:due
  })




})



export default getSingleDue