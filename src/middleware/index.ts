import app from "../app"
import cors from "cors";
import express, { Application, json } from "express";


const middleWare = (app:Application)=>{
 app.use(cors())
 app.use(express.json())

}



export default middleWare;