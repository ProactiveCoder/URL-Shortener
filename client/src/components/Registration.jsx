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
    <h1>Registration</h1>
    <form onSubmit={handleSubmit} >
        <input type="email" name="email" id="email" value={user.email} placeholder='Email' onChange={handleInput} />
        <input type="password" name="password" id="password" value={user.password} placeholder='Password' onChange={handleInput} />
        <input type="fullName" name="fullName" id="fullName" value={user.fullName} placeholder='fullName' onChange={handleInput} />
        <button type="submit">Sign In</button>
    </form>
    </>
  )
}

export default Registration