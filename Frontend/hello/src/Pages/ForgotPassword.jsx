import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:8000/api/forgot-password",
                { email }
            );

            alert(res.data.message);

            navigate("/verify-otp", {
                state: { email }
            });

        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div
                className="card shadow p-4 mx-auto"
                style={{ maxWidth: "400px" }}
            >
                <h3 className="text-center mb-4">
                    Forgot Password
                </h3>

                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="form-control mb-3"
                        placeholder="Enter registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;