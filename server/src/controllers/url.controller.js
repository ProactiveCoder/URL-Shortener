import URL from "../models/url.model.js"
import shortid from "shortid"
export const createShortUrl = async (req, res) => {
    const { originalUrl } = req.body;
  
    // Validate input
    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }
  
    try {
      const id = req.user._id;
  
      // Check if URL already exists for the user
      const existingUrl = await URL.findOne({ originalUrl:originalUrl, createdBy: id });
      if (existingUrl) {
        return res.status(400).json({
          success: false,
          message: "URL already created",
        });
      }
      // Create a new short URL
      const shortUrl = shortid.generate();
      console.log("short url generated : ",shortUrl)
      console.log("Hellow")
      const newURL = await URL.create({
         originalUrl,
         shortUrl,
        visitHistory: [],
        createdBy: req.user._id,
      });
  console.log("new url created byyyyyyyy: ",newURL)
      return res.status(200).json({
        id: shortUrl,
        success: true,
        message: "Short URL created successfully",
      });
    } catch (err) {
      // Handle MongoDB duplicate key error
      console.log(err);
      if (err.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Duplicate URL error: URL already exists" ,
        });
      }
  
      // Handle other server errors
      console.error("Error creating short URL:", err);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
  
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
            success:false,
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
    const id=req.user._id
    const users=await URL.find({createdBy:id});
    // console.log("all url user details: ",users)
    const urls=users.map(user=>(
        {
            shortUrl: user.shortUrl,
            originalUrl:user.originalUrl,
            noOfClicks:user.visitHistory.length
        }
    ))
    console.log("all url: ",urls)
    return res.status(200).json({
        success:true,
        urls
    })
}

