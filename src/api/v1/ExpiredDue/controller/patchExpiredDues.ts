import { RequestHandler } from "express";
import expiredDueService from '../../../../lib/expiredDue'
import asyncHandeler from "../../../../utils/asyncHandeler";


const patchExpiredDues:RequestHandler = asyncHandeler(async(req,res,next)=>{
 
     // Extract expiredDyes id
     const patchExpiredDuesId = req.params.id
     const sellingPrice = Number(req.body.data.sellingPrice)


    

   // call expiredDueService 
   const dueUpdated =await  expiredDueService.patchExpiredDues({id:patchExpiredDuesId,sellingPrice:sellingPrice})





})

export default patchExpiredDues