import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import API from '../Sevices'

const Login = () => {
    const navigate = useNavigate()
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const submitButton =async(e)=>{
        e.preventDefault()
        if(!email || !password){
             return toast.error("All Fields Necessary")
        }
        try {
            const login= await axios.post(`${API}/login`,{
                email,password
            })
            setEmail("")
            setPassword("")
            localStorage.setItem("token" , login.data.token)
            localStorage.setItem("role" ,login.data.role )
            localStorage.setItem("id",login.data.id)
            if(login.data.role === "Student"){
          navigate("/studentdashboard")
            }
             if(login.data.role === "Teacher"){
          navigate("/teacherdashboard")
            }
            

        } catch (error) {
            console.log(error)
        }
    }
    // useEffect(()=>{
    //     submitButton()
    // },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center relative overflow-hidden">

  {/* Background Glow */}
  <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-[180px] opacity-20 top-0 -left-20"></div>
  <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-[180px] opacity-20 bottom-0 -right-20"></div>

  {/* Login Card */}
  <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10">

    <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
      Welcome Back
    </h1>

    <p className="text-gray-400 text-center mt-2 mb-8">
      Login to your account
    </p>

    <form onSubmit={submitButton} className="space-y-6">

      {/* Email */}
      <div>
        <label className="block text-gray-300 mb-2">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white outline-none focus:border-blue-500 transition"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-gray-300 mb-2">
          Password
        </label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white outline-none focus:border-purple-500 transition"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg hover:scale-105 transition duration-300 shadow-lg"
      >
        Login
      </button>

    </form>

    {/* Divider */}
    <div className="flex items-center my-6">
      <div className="flex-1 border-t border-gray-700"></div>
      <span className="px-3 text-gray-500">OR</span>
      <div className="flex-1 border-t border-gray-700"></div>
    </div>

    {/* Register */}
    <p className="text-center text-gray-400">
      Don't have an account?
    </p>

    <button
      onClick={() => navigate("/register")}
      className="w-full mt-4 py-3 rounded-xl border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition duration-300"
    >
      Create Account
    </button>

  </div>

  <ToastContainer />

</div>
  
  )
}

export default Login


