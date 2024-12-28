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
        unique:true,
    },
    visitHistory:[
        {timestamp:{Type:Number}}
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

const URL=mongoose.model('URL',urlSchema);
export default URL;



