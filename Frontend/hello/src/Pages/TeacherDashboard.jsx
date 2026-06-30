
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import API from '../Sevices'

const TeacherDashboard = () => {
  const navigate = useNavigate()
  const id =localStorage.getItem("id")
  const token = localStorage.getItem("token")
  const[data, setData]= useState({})
  const[allProjects , setAllProjects]=useState([])
  const[approvedProjects , setApprovedProjects]=useState([])
  const[rejectedProjects , setRejectedProjects]=useState([])

  const fetchUser=async()=>{
try {
    const user = await axios.get(`${API}/dashboard/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    setData(user.data)
     toast.success(`Login sucess`)
} catch (error) {
    console.log(error)
}
  }

const fetchProjects =async()=>{
  try {
    const projects = await axios.get(`${API}/teacher/projects`,{
      headers:{
        teacherid:`${id}`
      }
    })
    setAllProjects(projects.data)
    console.log(projects.data)
  } catch (error) {
    
  }
} 


const fetchApproveProjects =async()=>{
  try {
    const projects = await axios.get(`${API}/teacher/projects`,{
      headers:{
        teacherid:`${id}`
      }
    })
     const approveProjects = projects.data.filter(project => project.status === "approved")
     setApprovedProjects(approveProjects)
  } catch (error) {
    console.log(error)
  }
}

const fetchRejectProjects =async()=>{
  try {
    const projects = await axios.get(`${API}/teacher/projects`,{
      headers:{
        teacherid:`${id}`
      }
    })
     const rejectProjects = projects.data.filter(project => project.status === "rejected")
     setRejectedProjects(rejectProjects)
  } catch (error) {
    console.log(error)
  }
}


const approved = async(pid)=>{
  try {
    
  const approve = await axios.patch(`${API}/project/${pid}/approve`)
    toast.success("Project Approved")
  fetchProjects()
  } catch (error) {
    
  }
}
const Rejected = async(pid)=>{
  try {
    const reject = await axios.patch(`${API}/project/${pid}/reject`)
    fetchProjects()
    toast.warn("Project Rejected")
  } catch (error) {
    
  }
}

  useEffect(()=>{
    fetchUser(),
    fetchProjects()
    fetchApproveProjects()
    fetchRejectProjects()
  },[])
  
  const logout =()=>{
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">

  {/* Header */}
  <header className="bg-white/10 backdrop-blur-xl border-b border-white/10">
    <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

      <div>
        <h1 className="text-3xl font-bold text-white">
          👨‍🏫 Welcome, {data.name}
        </h1>
        <p className="text-gray-400">
          Teacher Dashboard
        </p>
      </div>

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-xl text-white font-semibold transition"
      >
        Logout
      </button>

    </div>
  </header>

  {/* Statistics */}
  <div className="max-w-7xl mx-auto px-8 mt-10">

    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-blue-600 rounded-2xl p-6 shadow-xl text-white">
        <h3 className="text-lg">Total Projects</h3>
        <p className="text-4xl font-bold mt-3">
          {allProjects.length}
        </p>
      </div>

      <div className="bg-green-600 rounded-2xl p-6 shadow-xl text-white">
        <h3 className="text-lg">Approved</h3>
        <p className="text-4xl font-bold mt-3">
          {approvedProjects.length}
        </p>
      </div>

      <div className="bg-red-600 rounded-2xl p-6 shadow-xl text-white">
        <h3 className="text-lg">Rejected</h3>
        <p className="text-4xl font-bold mt-3">
          {rejectedProjects.length}
        </p>
      </div>

    </div>

  </div>

  {/* Project List */}
  <div className="max-w-7xl mx-auto px-8 mt-10">

    <h2 className="text-3xl font-bold text-white mb-8">
      📂 Submitted Projects
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      {allProjects.map((project) => (

        <div
          key={project._id}
          className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-blue-500 transition"
        >

          <h2 className="text-2xl font-bold text-white">
            {project.project}
          </h2>

          <p className="text-gray-400 mt-4">
            Submitted By:
            <span className="text-white ml-2">
              {project.studentId?.name}
            </span>
          </p>

          <p className="mt-3">
            Status:
            <span
              className={`ml-3 px-4 py-1 rounded-full text-sm text-white ${
                project.status === "approved"
                  ? "bg-green-500"
                  : project.status === "rejected"
                  ? "bg-red-500"
                  : "bg-yellow-500"
              }`}
            >
              {project.status}
            </span>
          </p>

          <div className="flex gap-3 mt-6">

            <button
              disabled={project.status !== "pending"}
              onClick={() => approved(project._id)}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white py-2 rounded-xl transition"
            >
              Approve
            </button>

            <button
              disabled={project.status !== "pending"}
              onClick={() => Rejected(project._id)}
              className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-500 text-white py-2 rounded-xl transition"
            >
              Reject
            </button>

          </div>

        </div>

      ))}

    </div>

  </div>

  {/* Approved & Rejected */}
  <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-2 gap-8">

    <div className="bg-white/10 backdrop-blur-xl border border-green-500 rounded-3xl p-6">

      <h2 className="text-2xl font-bold text-green-400 mb-5">
        ✅ Approved Projects
      </h2>

      <div className="space-y-3">

        {approvedProjects.map((project) => (

          <div
            key={project._id}
            className="bg-green-500/20 rounded-xl p-4 text-white"
          >
            {project.project}
          </div>

        ))}

      </div>

    </div>

    <div className="bg-white/10 backdrop-blur-xl border border-red-500 rounded-3xl p-6">

      <h2 className="text-2xl font-bold text-red-400 mb-5">
        ❌ Rejected Projects
      </h2>

      <div className="space-y-3">

        {rejectedProjects.map((project) => (

          <div
            key={project._id}
            className="bg-red-500/20 rounded-xl p-4 text-white"
          >
            {project.project}
          </div>

        ))}

      </div>

    </div>

  </div>

  <ToastContainer />

</div>
  )
}

export default TeacherDashboard