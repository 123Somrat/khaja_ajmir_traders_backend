import asyncHandeler from "../../../../utils/asyncHandeler";


const login = asyncHandeler(async(req,res,next)=>{
   
    const userInfo = req.body.data;
     console.log(userInfo)

});


export default login