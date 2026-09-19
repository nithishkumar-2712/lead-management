
import React, { useState } from "react";
import "./ResetPassword.css";

function ResetPassword() {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your reset password API logic
  };

  return (
    <div className="reset-container">

      <div className="reset-box">

        <h2>Reset Password</h2>

        <p>
          Enter your new password
        </p>

        <form onSubmit={handleSubmit}>

          {/* New Password */}
          <label>New Password</label>

          <div className="password-input-box">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="eye-button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? "👁️" : "👁️"}
            </button>

          </div>


          {/* Confirm Password */}
          <label>Confirm Password</label>

          <div className="password-input-box">

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

            <button
              type="button"
              className="eye-button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              aria-label={
                showConfirmPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showConfirmPassword ? "👁️" : "👁️"}
            </button>

          </div>


          {/* Reset Button */}
          <button
            type="submit"
            className="reset-button"
            disabled={isLoading}
          >
            {isLoading
              ? "Resetting..."
              : "Reset Password"}
          </button>

        </form>

      </div>

    </div>
  );
}
export default  ResetPassword
