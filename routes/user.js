import express from "express";
const router = express.Router();
import { getAllUsers, getMyProfile,  login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

router.post("/new", register);

router.get("/all", getAllUsers);




router.post('/login',login);
router.get('/logout',logout);


router.get("/me",isAuthenticated, getMyProfile);

export default router;
