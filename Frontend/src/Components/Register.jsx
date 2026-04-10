import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/hook';

const Register = () => {

  // UseNaviagate

  const navigate = useNavigate()

  // Values for input column

  const [username,setusername] = useState("")
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  
  // Access hook fn

  const {Loading,handleRegister} = useAuth()

  // handleSubmit fn

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister({username,email,password})
    navigate("/mainpage")
  }

  if(Loading){
    return (<main><h1>Loading.....</h1></main>)
  }
   
  
  return (
    <>
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        
        <h2 className="text-3xl font-bold text-center mb-6">Create Account 🚀</h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e)=>{setusername(e.target.value)}}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>{
              setemail(e.target.value)
            }}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>{
              setpassword(e.target.value)
            }}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold transition">
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <Link to="/Login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
        <p className="text-center mt-6 text-gray-400">
        Wanna back to Home?{" "}
          <Link to="/" className="text-green-400 hover:underline">
            Home
          </Link>
        </p>

      </div>
    </div> 
    </>
  )
}

export default Register
