import mongoose from "mongoose";

const urlSchema= mongoose.Schema({
    shortUrl:{
        type:String,
        required:true,
        unique:true,
    },
    originalUrl:{
        type:String,
        required:true,
        
    },
    visitHistory:[
        {timestamp:{type:Number}}
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
},{timestamps:true})

const URL=mongoose.model('URL',urlSchema);
export default URL;



