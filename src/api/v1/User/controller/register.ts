import asyncHandeler from "../../../../utils/asyncHandeler";
import authService from '../../../../lib/auth'
const register = asyncHandeler(async(req,res,next)=>{

   // getting UserInfo from req
   const userInfo = req.body.data;
 
 // Call userRegistretion service for create user
 const user = await authService.register(userInfo)

 
  res.status(201).json({
      status:201,
      code:'Created succesfully',
      messege:'User created successfullly',
      data:'token'
  })

})


export default register