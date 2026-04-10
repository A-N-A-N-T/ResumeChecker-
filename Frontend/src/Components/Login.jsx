import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/hook';

const Login = () => {

  const {loading,handleLogin} = useAuth()
  const navigate = useNavigate()

  const [email,setUserEmail]= useState("")
  const [password,setUserPassword] = useState("")
  const handleSubmit = async (e) => {
     e.preventDefault()
     await handleLogin({email,password})
     setUserEmail("")
     setUserPassword("")
     navigate("/mainpage")
  }

  if(loading){
    return (<main><h1>Loading.....</h1></main>)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back 👋</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            onChange={(e)=>{
              setUserEmail(e.target.value)
            }}
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
           
            onChange={(e)=>{
              setUserPassword(e.target.value)
            }}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-semibold transition">
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="text-center mt-6 text-gray-400">
          Wanna back to home?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Home
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
