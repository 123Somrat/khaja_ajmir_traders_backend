import app from "../app"
import cors from "cors";
import express, { Application, json } from "express";
import router from "../routes";


const middleWare = (app:Application)=>{
 app.use(cors())
 app.use(express.json())
 app.use(router)

}






export default middleWare;