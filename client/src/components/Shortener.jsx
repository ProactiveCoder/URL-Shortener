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
        body:JSON.stringify(user)
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
    <form onSubmit={handleSubmit}>
      <input type="text" name="originalUrl" id="originalUrl" required placeholder="Enter URL" value={user.originalUrl} onChange={handleInput} />
      <button type="submit">Submit</button>
    </form>

    <div>
        <h1>URL DATA</h1>
          {urldata ? (
            urldata.map((url, index) => (
              <div key={index}>
                <span>Original URL: {url.originalUrl} </span>
                <span> Short URL: {url.shortUlr} </span>
                <span> Clicks: {url.noOfClikcs || 0}</span>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        
    </div>


    
    </>
  )
}

export default Shortener