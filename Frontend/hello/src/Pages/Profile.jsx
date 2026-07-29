//import React from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../Sevices";

const Profile = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const fetchProfile = async () => {
        try {
        const res = await axios.get(`${API}/profile/${id}`, {
        headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Profile Response",res.data);
    setData(res.data);

  } catch (error) {
    console.log("Profile Error:",error.response?.data || error.message);
  }
};
useEffect(() => {
  fetchProfile();
}, []);
return (
  <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-8">

    <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-10">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        👤 My Profile
      </h1>

      {/* Avatar */}
      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-5xl font-bold text-white">
          {data.name ? data.name.charAt(0).toUpperCase() : "U"}
        </div>
      </div>

      {/* User Details */}
      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-900 rounded-2xl p-5">
          <h3 className="text-gray-400">Full Name</h3>
          <p className="text-2xl text-white font-semibold">
            {data.name}
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-5">
          <h3 className="text-gray-400">Email</h3>
          <p className="text-white">
            {data.email}
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-5">
          <h3 className="text-gray-400">Role</h3>
          <p className="text-white">
            {data.role}
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-5">
          <h3 className="text-gray-400">User ID</h3>
          <p className="text-white break-all">
            {data._id}
          </p>
        </div>

      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-5 mt-10">

        <div className="bg-blue-600 rounded-2xl p-6 text-center">
          <h2 className="text-4xl font-bold text-white">0</h2>
          <p className="text-white mt-2">Projects</p>
        </div>

        <div className="bg-green-600 rounded-2xl p-6 text-center">
          <h2 className="text-4xl font-bold text-white">0</h2>
          <p className="text-white mt-2">Approved</p>
        </div>

        <div className="bg-red-600 rounded-2xl p-6 text-center">
          <h2 className="text-4xl font-bold text-white">0</h2>
          <p className="text-white mt-2">Rejected</p>
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-10">

        <button onClick={()=> navigate("/edit-profile")}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold transition"
        >
          Edit Profile
        </button>

        <button
          onClick={() =>
            navigate(
              data.role === "Student"
                ? "/studentdashboard"
                : "/teacherdashboard"
            )
          }
          className="bg-gray-700 hover:bg-gray-800 px-6 py-3 rounded-xl text-white font-semibold transition"
        >
          Back
        </button>

      </div>

    </div>

  </div>
)
}

export default Profile;