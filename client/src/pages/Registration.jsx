import { useState } from 'react'

function Registration() {
    const [user,setUser]=useState({email:"",
        password:"",
        fullName:""
    })

    const handleInput=(e)=>{
        e.preventDefault();
        let name=e.target.name;
        let value=e.target.value;
        setUser({
            ...user,
            [name]:value
        })
        console.log(user)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response=await fetch("http://localhost:8000/user/register",{
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify(user)
            })
            const res=await response.json();
            console.log(res)

        } catch (err) {
            console.log("Error in handleSubmit ",err);
            
        }
    }
  return (
    <>
    <div className='flex flex-col justify-center items-center bg-green-400 p-5 h-[91vh] '>

    <h1 className='p-5 font-bold text-3xl'>Registration</h1>
    <form onSubmit={handleSubmit} className="flex flex-col p-10 rounded-md bg-green-700" >
        <input className="m-2 p-2 rounded-lg" type="email" name="email" id="email" value={user.email} placeholder='Email' onChange={handleInput} />
        <input className="m-2 p-2 rounded-lg" type="password" name="password" id="password" value={user.password} placeholder='Password' onChange={handleInput} />
        <input className="m-2 p-2 rounded-lg" type="fullName" name="fullName" id="fullName" value={user.fullName} placeholder='Full Name' onChange={handleInput} />
        <button className="bg-pink-400 m-2 p-1 font-bold rounded-lg" type="submit">Sign In</button>
    </form>
    </div>
    </>
  )
}

export default Registration