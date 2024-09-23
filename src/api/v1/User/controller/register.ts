import asyncHandeler from "../../../../utils/asyncHandeler";

const register = asyncHandeler(async(req,res,next)=>{

   const userInfo = req.body;
   console.log('i am from registrtionController',userInfo)



})


export default register