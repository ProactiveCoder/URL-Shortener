import  { useState } from 'react'

function Login() {
    const [user,setUser]= useState({email:"",password:""})
    const handleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setUser({
            ...user,
            [name]:value
        })
    }
    const handleLogin=async(e)=>{
        e.preventDefault();
        try {
            const response=await fetch("http://localhost:8000/user/login",{
                method:"POST",
                headers:{"content-type":"application/json"},
                body:JSON.stringify(user),
                credentials: "include",
            })
            const res=await response.json();
            console.log(res)
        } catch (err) {
            console.log("error in Login :",err)
            
        }
    }
  return (
    <>
    <h1>Login</h1>
    <form onClick={handleLogin} >
        <input type="email" name="email" id="email " placeholder='Email' value={user.email} onChange={handleInput} />
        <input type="password" name="password" id="password " placeholder='Password' value={user.password} onChange={handleInput} />
        <button type="submit">LogIn</button>
    </form>
    </>
  )
}

export default Login