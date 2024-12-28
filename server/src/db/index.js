import mongoose from "mongoose";
import { DB_NAME } from "../constrain.js";

const connectDB = async()=>{
    try {
        const db= await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`)
        console.log("DB connection is established",`${db.connection.host}`)
    }   
     catch (err) {
        console.log("Error in dbConnection file ",err);
        
    }
}

export {connectDB}