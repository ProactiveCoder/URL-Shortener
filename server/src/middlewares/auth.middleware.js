import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { getToken } from "../utils/authValidation.js";

export const verifyAuth= async(req,res,next)=>{
    const token= req.cookies.authToken;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"please Login first"
        })
    }
    try {
        const decoded= await getToken(token); 
        // console.log(decoded)
        const user= await User.findOne({_id:decoded._id});
        // console.log("user found: " ,user)
        
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        req.user=decoded;
        console.log("req.deocded ",decoded)
        console.log("req.user from middleware ",req.user._id)
        next();
    } catch (error) {
        return res.status(404).json({
            success:false,
            message:"error in token"
        })
    }
}