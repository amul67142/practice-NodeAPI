import express from "express";
import userRouter from "./routes/user.js"
import { config } from "dotenv";

config({
    path:"./database/config.env"
})


export const app = express();



//middlewares
app.use(express.json());
app.use('/users',userRouter);


app.get('/',(req,res)=>{
    res.send("nice work");
})




