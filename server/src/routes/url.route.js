import express from 'express';
import {createShortUrl,redirectToWebsite,analyticsOfUrl,findAllUrl} from "../controllers/url.controller.js"
const route=express.Router();


route.post("/",createShortUrl)
route.get("/:id",redirectToWebsite);
route.get("/analytic/:id",analyticsOfUrl)
route.get("/",findAllUrl)



export default route;