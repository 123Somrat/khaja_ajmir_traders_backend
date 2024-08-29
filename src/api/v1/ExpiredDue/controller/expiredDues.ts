import { RequestHandler } from "express"
import asyncHandeler from "../../../../utils/asyncHandeler"

const allExpiredDues:RequestHandler = asyncHandeler(async(req,res,next)=>{

       console.log('Working fine')


})


export default allExpiredDues