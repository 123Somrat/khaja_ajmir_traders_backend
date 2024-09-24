import asyncHandeler from "../../../../utils/asyncHandeler";
import authService from '../../../../lib/auth'

const login = asyncHandeler(async(req,res,next)=>{
   
    // Gettng userInfo from request
    const userInfo = req.body.data;
     
    // Call authServiec for authenticate user
    const logedInUser = await authService.login(userInfo)

});


export default login