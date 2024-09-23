import asyncHandeler from "../../../../utils/asyncHandeler";

const register = asyncHandeler(async(req,res,next)=>{

   const userInfo = req.body;
   console.log(userInfo)



})


export default register