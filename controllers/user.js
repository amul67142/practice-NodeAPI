import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";




export const getAllUsers = async (req, res) => {};

export const login=async(req,res)=>{
  const { email}=req.body;
  const existinguser = await User.findOne({email}).select("+password");
  if(!existinguser) return res.status(404).json({
    success:false,
    message: "invalid email or password"
  })

  const isMatch = await bcrypt.compare(req.body.password,existinguser.password)

  if(!isMatch) return res.status(404).json({
    success:false,
    message: "invalid email or password"
  })

  sendCookie(existinguser,res,`Welcome back ${existinguser.name}`,200);
};

export const register = async (req, res) => {
  const {name , email}=req.body;
  const existuser = await User.findOne({email});
  if(existuser) return res.status(404).json({
    success:false,
    message: "user already exist"
  })

  const hashedPass=await bcrypt.hash(req.body.password,10);

  const user =await User.create({name,email,password:hashedPass});
  sendCookie(user,res,"registered",201);
};

export const getMyProfile =(req, res) => {

  res.status(200).json({
    success:true,
    info:req.user,
  })  

};

export const logout=(req, res)=>{

  res.status(200).cookie("token", "",{expires:new Date(Date.now())}).json({
    success:true,
    
    
  })

};
