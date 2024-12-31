import { Link } from "react-router-dom"
function Header() {
  return (
    <>
    <div className="flex justify-around bg-green-600 p-2">
        <div>
            <h1 className="font-bold text-lg">URL Shortener</h1>
        </div>
        <div className="">
            <Link to='/login'><button className="px-2 font-bold">LogIn</button></Link>
            <Link to='/register'><button className="px-2 font-bold">SignIn</button></Link>
            
            
        </div>
    </div>
    </>
  )
}

export default Header