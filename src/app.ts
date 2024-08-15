import express, { Request , Response , NextFunction} from "express";
import dotenv from "dotenv";
import HttpError from "./utils/customError";

const app = express();
dotenv.config();


app.get('/api/v1/health',(_req,res)=>{
   res.json({
       health:"OK",
       message:'Boddha biaggin tik tak,tui ham gor',
       code : 200
   })
})




export default app;
