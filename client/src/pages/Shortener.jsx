import { useState,useEffect } from "react"
function Shortener() {
  const [user, setUser]=useState({originalUrl:""})
  const [urldata, setUrldata]=useState(null)
  const handleInput=(e)=>{
    let name= e.target.name;
    let value=e.target.value;
    setUser({[name]:value})
    console.log(user)

  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response= await fetch("http://localhost:8000/url/",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(user),
        credentials: "include",
      })
      const res=await response.json()
      // console.log(res)
      // console.log(response.ok)
      alert(res.message)
      urlGet();
    }
    catch(err){
      console.log(err);
    }
  }

  const urlGet=async()=>{
    // e.preventDefault()
    try{
      const response= await fetch("http://localhost:8000/url/",{
        method:"GET",
        headers:{"content-type":"application/json"},
        credentials: "include",
        // body:JSON.stringify(user)
      })
      const res=await response.json()
      // console.log(res.urls)
      // console.log(response.ok)
      setUrldata(res.urls);
      // alert(res.message)
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    urlGet();
  },[] );
  return (
    <>
    <div className="  bg-green-400 h-[91vh] flex flex-col">


    <div className="flex flex-col justify-center items-center p-5  ">

    <h1 className="p-5 font-bold text-3xl">URL SHORTENER</h1>
    <form onSubmit={handleSubmit} className="flex flex-col p-10 rounded-md bg-green-700">
      <input className="m-2 p-2 rounded-lg" type="text" name="originalUrl" id="originalUrl" required placeholder="Enter URL" value={user.originalUrl} onChange={handleInput} />
      <button className="bg-pink-400 m-2 p-1 font-bold rounded-lg" type="submit">Submit</button>
    </form>

    <div className="flex flex-col justify-center items-center bg-green-400 p-5  ">
        <h1 className="p-5 font-bold text-3xl">URL DATA</h1>
          {urldata ? (
            urldata.map((url, index) => (
              <div key={index} className="p-2 m-1 rounded-md bg-green-700">
                <span className="p-2 m-1 rounded-md bg-pink-500">Original URL: {url.originalUrl} </span>
                <span> Short URL: {url.shortUrl} </span>
                <span> Clicks: {url.noOfClicks || 0}</span>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        
    </div>
    </div>
    </div>


    
    </>
  )
}

export default Shortener