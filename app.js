import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

config({
    path:"./database/config.env"
})


export const app = express();



//middlewares
app.use(express.json());
app.use(cookieParser());


//routes


app.use('/api/v1/users',userRouter);
app.use('/api/v1/task',taskRouter);


app.get('/',(req,res)=>{
    res.send("nice work");
})
//using error middleware

app.use(errorMiddleware);




