import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import API from '../Sevices'

const StudentDashboard = () => {
  const navigate=useNavigate()
      const id = localStorage.getItem("id")
      const token = localStorage.getItem("token")
      const[data,setData]=useState({})
      const[allTeachers,setAllTeachers]=useState([])
      const[teacherId,setTeacherId]=useState("")
      const[project,setProject]=useState("")
      const[description,setDescription]=useState("")
      const[projects,setProjects]=useState([])
      const[isLoading,setIsLoading]=useState(true)

    const fetchUser = async()=>{
  try {
      const user = await axios.get(`${API}/dashboard/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
      })
      setData(user.data)
      console.log(user)
  } catch (error) {
    console.log(error)
  }
    }
    const fetchTeachers=async()=>{
      try {
        const teachers =await axios.get(`${API}/allteachers`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        console.log("Teachers API",teachers.data)
        setAllTeachers(teachers.data)
        //console.log(allTeachers)
      } catch (error) {
          console.log(error.response?.data)        
      }
    }
    const addproject=async(e)=>{
      e.preventDefault()
      console.log("submit clicked")
      try {
        const projects=await axios.post(`${API}/addproject`,{
          studentId:id,
          teacherId,
          project,
          description,
        },{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        console.log(projects.data)
        setProject("")
        setDescription("")
        setTeacherId("")
        fetchProjects()
        toast.success("Project Added Sucessfully")
      } catch (error) {
        console.log(error.response?.data)
        toast.error(error.response?.data?.message) || "Project submission failed"
      }
    }

    const fetchProjects=async()=>{
      try{
        const projectsDetails=await axios.get(`${API}/student/projects`,{
          headers:{
            //Authorization:`Bearer ${token}`
            studentid:`${id}`
          }
        })
        setProjects(projectsDetails.data)
        setIsLoading(false)
      }
      catch(error){
        console.log(error)
        //setIsLoading(false)
      }
    }
    const logout=()=>{
      localStorage.clear()
      navigate("/")
    }
    const deleteProject=async(pid)=>{
      try {
        const deleteProject=await axios.delete(`${API}/delete/project/${pid}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        fetchProjects()
        toast.success("Project Delete Sucessfully")
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
        fetchUser(),
        fetchTeachers(),
        fetchProjects()
    },[])

  return (
    
  <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">

    {/* Background Glow */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[180px] opacity-20"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-[180px] opacity-20"></div>

    {/* Header */}
    <header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        <div>
          <h1 className="text-3xl font-bold text-white">
            👋 Welcome, {data.name}
          </h1>
          <p className="text-gray-400">
            Student Dashboard
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

    {/* Main Section */}
    <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 p-8">

      {/* Project List */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-white mb-6">
          📁 Your Projects
        </h2>

        {isLoading && (
          <p className="text-gray-400">Loading...</p>
        )}

        {!isLoading && projects.length === 0 && (
          <p className="text-gray-400">No Projects Uploaded.</p>
        )}

        <div className="space-y-5">

          {projects.map((item) => (

            <div
              key={item._id}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-5 hover:border-blue-500 transition"
            >

              <div className="flex justify-between items-center">

                <h3 className="text-xl font-bold text-white">
                  {item.project}
                </h3>

                <span
                  className={`px-4 py-1 rounded-full text-sm text-white ${
                    item.status === "approved"
                      ? "bg-green-500"
                      : item.status === "rejected"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {item.status}
                </span>

              </div>

              <p className="text-gray-400 mt-3">
                {item.description}
              </p>

              <p className="text-gray-300 mt-3">
                <strong>Teacher:</strong>{" "}
                {item.teacherId?.name || "Not Assigned"}
              </p>

              <button
                onClick={() => deleteProject(item._id)}
                className="mt-5 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl text-white transition"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

      {/* Submit Project */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-white mb-6">
          🚀 Submit Project
        </h2>

        <form onSubmit={addproject} className="space-y-5">

          <div>
            <label className="text-gray-300 block mb-2">
              Project Name
            </label>

            <input
              type="text"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="Enter project name"
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-2">
              Description
            </label>

            <textarea
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project description..."
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-2">
              Select Teacher
            </label>

            <select
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            >
              <option value="">Choose Teacher</option>

              {allTeachers.map((teacher) => (
                <option
                  key={teacher._id}
                  value={teacher._id}
                >
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg hover:scale-105 transition"
          >
            Submit Project
          </button>

        </form>

      </div>

    </div>

    <ToastContainer />

  </div>
);

 }

export default StudentDashboard
