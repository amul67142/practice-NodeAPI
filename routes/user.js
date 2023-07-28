import express from "express";
const router = express.Router();
import { getAllUsers, getUserDetails, register } from "../controllers/user.js";

router.post("/new", register);

router.get("/all", getAllUsers);

router.get("/userId/:id",getUserDetails);

export default router;
