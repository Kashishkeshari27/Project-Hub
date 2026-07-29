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
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
    <h1 className="text-4xl font-bold mb-8">
      Profile
    </h1>

    <h2>Name: {data.name}</h2>

    <h2>Email: {data.email}</h2>

    <h2>Role: {data.role}</h2>
  </div>

  );
};

export default Profile;