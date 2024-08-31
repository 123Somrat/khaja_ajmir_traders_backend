import { RequestHandler } from "express";
import asyncHandeler from "../../../../utils/asyncHandeler";

const patchExpiredDues:RequestHandler = asyncHandeler(async(req,res,next)=>{
 
     // Extract expiredDyes id
     const patchExpiredDuesId = req.params.id








})

export default patchExpiredDues