import asyncHandeler from "../../../../utils/asyncHandeler";

const updateExpiredDueDate = asyncHandeler(async(req,res,next)=>{
       console.log('i am from updateExpiredDueDate',req.body.data)




})

export default updateExpiredDueDate
