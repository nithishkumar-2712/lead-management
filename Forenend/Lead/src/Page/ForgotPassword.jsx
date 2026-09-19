import React, { useState } from "react";
import axios from "../Config/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
function ForgotPassword() {

  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!Email) {
    Swal.fire({
      icon: "warning",
      title: "Email Required",
      text: "Please enter your email",
    });
    return;
  }

  if (isLoading) return;

  setIsLoading(true);

  try {
    const { data } = await axios.post(
      "/forgot-password",
      {
        Email: Email,
      }
    );

    if (!data.success) {
      await Swal.fire({
        icon: "warning",
        title: "Failed",
        text: data.message,
      });
      return;
    }

    await Swal.fire({
      icon: "success",
      title: "Email Sent",
      text: data.message,
      confirmButtonColor: "#2563EB",
    });

    navigate("/");

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        error.response?.data?.message ||
        "Something went wrong",
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="forgot-container">

      <div className="forgot-box">

        <h2>Forgot Password?</h2>

        <p>
          Enter your registered email address
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={isLoading}
          >
            {isLoading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

        </form>

        <button
          type="button"
          onClick={() => navigate("/")}
        >
          Back to Login
        </button>

      </div>

    </div>
  );
}
export default  ForgotPassword