import { connectDB } from "./db/index.js";
import { app } from "./app.js";

import dotenv from "dotenv"
dotenv.config()
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`server is running at port ${process.env.PORT}`);
        
    })
})

