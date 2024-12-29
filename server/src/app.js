import express from "express";
import cors from "cors"
import cookieparser from 'cookie-parser'
const app= express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials:true,
}))
app.use(cookieparser())
//routes
import urlRoutes from "./routes/url.route.js"
import userRoutes from "./routes/user.route.js"

app.use("/url",urlRoutes)
app.use("/user",userRoutes)


export {app}