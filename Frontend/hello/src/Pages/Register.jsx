import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import API from '../Sevices'

const Register = () => {
    const navigate = useNavigate()
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const[role,setRole]=useState("Student")
    const[error,setError]=useState('')

const register =async(e)=>{
    e.preventDefault()
    if(!name || !email || !password){
        return setError("All fileds Necessary")
    }
    try {
        const details= await axios.post(`${API}/signup`,{
            name,
            email,
            password,
            role
        })
        setEmail("")
        setPassword("")
        setName("")
        toast.success("Registration Sucessfull")
        setTimeout(() => {
            navigate("/login")
        }, 3000);
        console.log(details)
    } catch (error) {
        console.log(error)
    }

}

useEffect(()=>{
     register()
 },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center relative overflow-hidden">

  {/* Background Glow */}
  <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[180px] opacity-20"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-[180px] opacity-20"></div>

  {/* Register Card */}
  <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10">

    <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
      Create Account
    </h1>

    <p className="text-center text-gray-400 mt-2 mb-8">
      Join the Student Project Management System
    </p>

    <form onSubmit={register} className="space-y-5">

      {/* Name */}
      <div>
        <label className="block text-gray-300 mb-2">
          Full Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-blue-500 transition"
        />
      </div>

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
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-blue-500 transition"
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
          placeholder="Create a password"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white placeholder-gray-500 outline-none focus:border-purple-500 transition"
        />
      </div>

      {/* Role */}
      <div>
        <label className="block text-gray-300 mb-2">
          Select Role
        </label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white outline-none focus:border-blue-500 transition"
        >
          <option value="Student">🎓 Student</option>
          <option value="Teacher">👨‍🏫 Teacher</option>
        </select>
      </div>

      {/* Signup Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg hover:scale-105 transition duration-300 shadow-lg"
      >
        Create Account
      </button>

    </form>

    {/* Divider */}
    <div className="flex items-center my-6">
      <div className="flex-1 border-t border-gray-700"></div>
      <span className="px-3 text-gray-500">OR</span>
      <div className="flex-1 border-t border-gray-700"></div>
    </div>

    {/* Login Link */}
    <p className="text-center text-gray-400">
      Already have an account?
    </p>

    <button
      onClick={() => navigate("/login")}
      className="w-full mt-4 py-3 rounded-xl border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition duration-300"
    >
      Login
    </button>

  </div>

  <ToastContainer />

</div>
    
  )
}

export default Register



