import { useState } from "react";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });
      const res = await response.json();
      console.log(res);
    } catch (err) {
      console.log("error in Login :", err);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-green-400 p-5 h-[91vh] ">
        <h1 className="p-5 font-bold text-3xl">Login</h1>
        <form onClick={handleLogin} className="flex flex-col p-10 rounded-md bg-green-700">
          <input
          className="m-2 p-2 rounded-lg"
            type="email"
            name="email"
            id="email "
            placeholder="Email"
            value={user.email}
            onChange={handleInput}
          />
          <input
          className="m-2 p-2 rounded-lg"
            type="password"
            name="password"
            id="password "
            placeholder="Password"
            value={user.password}
            onChange={handleInput}
          />
          <button className="bg-pink-400 m-2 p-1 font-bold rounded-lg" type="submit">LogIn</button>
        </form>
      </div>
    </>
  );
}

export default Login;
