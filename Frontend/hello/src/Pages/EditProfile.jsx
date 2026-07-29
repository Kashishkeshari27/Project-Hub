import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../Sevices";

const EditProfile = () => {
  const navigate = useNavigate();

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API}/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setName(res.data.name);
        setEmail(res.data.email);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  // Update profile
  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${API}/profile/${id}`,
        {
          name,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      navigate("/profile");
    } catch (error) {
        console.log(error.response);
        console.log(error.response?.data);
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex justify-center items-center">

      <div className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl w-[450px]">

        <h1 className="text-3xl text-white font-bold mb-8 text-center">
          Edit Profile
        </h1>

        <form onSubmit={updateProfile} className="space-y-5">

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 rounded-xl bg-gray-900 text-white border border-gray-700"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-gray-900 text-white border border-gray-700"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditProfile;