
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
   try {
    
    const userId= req.user._id;

    const tasks= await Task.find({user : userId});

    res.status(200).json({
        success:true,
        tasks
    })
   } catch (error) {

    next(error)
    
   }
}

export const updateTask=async(req,res)=>{
        try{
   const task= await Task.findById(req.params.id);

   if(!task)
   return res.status(404).json({
    success: false,
    message: "Task not found",
});

   task.isCompleted=!task.isCompleted;
   await task.save();


   res.status(200).json({
    success:true,
    message:"updated"
   })
}catch(error){
    res.status(500).json({
        success: false,
        message: "invalid id",
        error: error.message,
    });

}
    

 
}

export const deleteTask = async (req, res) => {
    try {
        // Find the task in the database by its ID
        const task = await Task.findById(req.params.id);

        // If the task is not found in the database, return an error response
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        // If the task is found, delete it from the database using deleteOne()
        await task.deleteOne();

        // Return a success response indicating the task was deleted successfully
        res.status(200).json({
            success: true,
            message: "Task deleted",
        });
    } catch (error) {
        // Handle any MongoDB-related errors
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the task",
            error: error.message,
        });
    }
}
