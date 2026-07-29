import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../Sevices";

const ResetPassword = () => {

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const resetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {

      const res = await axios.post(`${API}/reset-password`, {
        email,
        newPassword,
      });

      alert(res.data.message);

      navigate("/login");

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center">

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 w-[420px]">

        <h1 className="text-3xl font-bold text-center text-white">
          Reset Password
        </h1>

        <p className="text-center text-gray-400 mt-2 mb-8">
          Enter your new password
        </p>

        <form onSubmit={resetPassword}>

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white outline-none"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mb-5 px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 text-white outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold"
          >
            Reset Password
          </button>

        </form>

      </div>

    </div>
  );
};

export default ResetPassword;