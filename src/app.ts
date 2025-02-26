import express from "express";
import dotenv from "dotenv";


const app = express();
dotenv.config();


  
app.get('/api/v1/health',(_req,res)=>{
   res.json({
       status:200,
       message:'Boddha biaggin tik tak,tui ham gor',
       code :"OK"
   })
})




export default app;
