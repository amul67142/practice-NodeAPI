import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask=async(req,res,next)=>{

    console.log(req.user);
    

    const {title , description}=req.body
    await Task.create({
        title,
        description,
        user:req.user
    })

    res.status(201).json({
        success:true,
        message:"task added"
    })
        
};



export const getMyTask=async(req,res)=>{
        const userId= req.user._id;

        const tasks= await Task.find({user : userId});

        res.status(200).json({
            success:true,
            tasks
        })
}

export const updateTask=async(req,res)=>{

   const task= await Task.findById(req.params.id);

   if(!task)
   return next(new Error("invalid id"))

   task.isCompleted=!task.isCompleted;
   await task.save();


   res.status(200).json({
    success:true,
    message:"updated"
   })
    

 
}

export const deleteTask=async(req,res)=>{
    const task= await Task.findById(req.params.id);

    if(!task)
   return res.status(err.statusCode).json({
    success:false,
    message:err.message,
});

    await task.deleteOne();
   
    res.status(200).json({
        success:true,
        message:"deleted"
       })


}