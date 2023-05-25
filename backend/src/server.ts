 import dotenv from 'dotenv'
 dotenv.config()
 import { dbconnect } from './configs/database.config'
dbconnect()
 
 import express from "express"
 import cors from "cors"
import { sampleFood, sample_tags, sample_users } from "./data";
import jwt from "jsonwebtoken"
import foodRouter from "./routers/food.router"
import userRouter from "./routers/user.router"

 const app = express();
 app.use(express.json())
 app.use(cors({
    credentials:true,
    origin:['http://localhost:4200']
 }))

 app.use("/api/foods", foodRouter )
app.use("/api/users",userRouter)

 const port = 5000;
 app.listen( port ,()=>{
    console.log('website is served on http://localhost:'+ port);
    
 })