import URL from "../models/url.model.js"
import shortid from "shortid"
export const createShortUrl= async(req,res)=>{
    const {originalUrl}=req.body;
    if (!originalUrl){
        return res.status(400).json(
            {
                success:false,
                message:"url is required"
            }
        )
    }
    const result=await URL.findOne({originalUrl});
    if(result){
        return res.status(400).json({
            success:false,
            message:"Already created"
        })
    }
    const shortUrl=shortid.generate();
    await URL.create({
        originalUrl:originalUrl,
        shortUrl: shortUrl,
        visitHistory:[]

    })
    return res.status(200).json({
        id:shortUrl,
        success:true,
        message:"created"
    })
}

export const redirectToWebsite=async (req,res)=>{
    const id=req.params.id;
    const data=await URL.findOneAndUpdate({
            shortUrl:id
    },{
        $push:{
            visitHistory:{
                timestamp: Date.now()
            },
        },
    },{new:true})

    if(!data){
        return res.status(404).json({
            success:true,
            message: "URL is not found"
        })
    }

    return res.redirect(data.originalUrl)
}

export const analyticsOfUrl=async(req,res)=>{
    const id=req.params.id;
    const data= await URL.findOne({shortUrl:id});
    return res.status(200).json({
        success:true,
        totalClicks: data.visitHistory.length,
        analytics:data.visitHistory
    })
}


export const findAllUrl=async (req,res)=>{
    const users=await URL.find();
    const urls=users.map(user=>(
        {
            shortUlr: user.shortUrl,
            originalUrl:user.originalUrl,
            noOfClikcs:user.visitHistory.length
        }
    ))
    return res.status(200).json({
        success:true,
        urls
    })
}

