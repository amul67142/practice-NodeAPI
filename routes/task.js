import express  from "express";
const router=express.Router();
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";



router.post('/new', isAuthenticated, newTask )

router.get('/my', isAuthenticated, getMyTask )

router.route('/:id').put( isAuthenticated ,updateTask).delete(  isAuthenticated  ,deleteTask);






export default router;