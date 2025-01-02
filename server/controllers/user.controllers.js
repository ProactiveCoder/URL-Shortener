import User from "../models/user.model.js";
import { setToken } from "../utils/authValidation.js";
export const signInUser=async(req,res)=>{
    const {fullName,email, password}=req.body;
    if(!fullName || !email ||!password){
        return res.status(400).json({
            success:false,
            message:"fullName, email, password is required"
        })
    }
    const checkUser= await User.findOne({email});
    if(checkUser){
        return res.status(400).json({
            success:false,
            message:"email already used"
        })
    }
    await User.create({
        fullName:fullName,
        email:email,
        password:password,

    })
    return res.status(200).json({
        success:true,
        message:"new user is created"
    })
}

export const loginUser=async(req,res)=>{
    const {email, password}=req.body;
    const checkUser= await User.findOne({email});
    if(!checkUser){
        return res.status(404).json({
            success:false,
            message:"user is not exit"
        })
    }
    // const checkPassword =await User.findOne({password});
    if(checkUser.password!=password){
        return res.status(404).json({
            success:false,
            message:"password is not match"
        })
    }
    const token = await setToken(checkUser._id, checkUser.email);
    console.log("Generated Token",token);
   
    const { password: _, ...rest } = checkUser.toObject();
    return res.cookie("authToken",token,{httpOnly: true,
        secure: true}).status(200).json({
        success:true,
        message:"login Successfully",
        user:rest

    })
}