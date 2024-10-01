import asyncHandeler from "../../../../utils/asyncHandeler";
import authService from '../../../../lib/auth'

const login = asyncHandeler(async(req,res,next)=>{
   
    // Gettng userInfo from request
    const userInfo = req.body.data;
     
    // Call authServiec for authenticate user
    const userAndToken = await authService.login(userInfo);
    const transFormedUserData = {
         name : userAndToken?.isUser.name,
         email : userAndToken?.isUser.email,
         role:userAndToken?.isUser.role
    }
     

    // Include the token in cookie
    res.cookie('jwtToken',userAndToken?.token,{httpOnly:true,secure:true,maxAge:3600000})
   

    res.status(200).json({
        status:200,
        code :'Ok',
        message:'User logedin successfullt',
        data : transFormedUserData
    })

});


export default login