import React, { useState,useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../Sevices";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading,setLoading]=useState(false);
  const [sending,setSending]=useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  useEffect(()=>{
    if(!email){
      navigate("/forgot-password");
    }
  },[email,navigate]);

  const verifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/verify-otp`, {
        email,
        otp,
      });

      alert(res.data.message);

      navigate("/reset-password", {
        state: { email },
      });
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
    finally{
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    setSending(true);
    try {
      const res = await axios.post(`${API}/forgot-password`, {
        email,
      });

      alert(res.data.message);
    } catch (err) {
      alert("Failed to resend OTP");
    }
    finally{
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold text-center mb-6">
          Verify OTP
        </h2>

        <form onSubmit={verifyOTP}>

          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="w-full border p-3 rounded mb-4"/>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-3 rounded">
    {loading ? "Verifying..." : "Verify OTP"}
</button>
        <button
    onClick={resendOTP}
    disabled={sending}
    className="w-full mt-4 bg-green-600 text-white p-3 rounded">
    {sending ? "Sending..." : "Resend OTP"}
</button>
        </form>

    
      </div>
    </div>
  );
};

export default VerifyOTP;