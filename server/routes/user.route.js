import express from "express";
import { loginUser, signInUser } from "../controllers/user.controllers.js";

const route= express.Router();

route.post("/register",signInUser)
route.post("/login",loginUser)


export default route;
