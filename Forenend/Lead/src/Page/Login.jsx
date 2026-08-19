import React, { useContext,useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import Customhook from "../components/Customhook";
import axios from "../Config/axios";
import {useNavigate}from"react-router-dom"
import { AppContext } from "../App";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const{isLoggedIn,tokencheck}=useContext(AppContext);
  console.log(isLoggedIn)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const {
    Data: Role,
    Loading:LoadingRole,
  } = Customhook("/api/GetRoleregistre");
  // console.log(object)
  // console.log(Role)

const onSubmit = async (send) => {
  if (isLoading) return;

  setIsLoading(true);

  try {
    const { data } = await axios.post("/api/login", send);

    if (!data.success) {
      await Swal.fire({
        icon: "warning",
        title: "Login Failed",
        text: data.message,
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    const role = data.data.userType.roleName;

    await Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: data.message,
      confirmButtonColor: "#2563EB",
      timer: 2000,
      showConfirmButton: false,
    });

    await tokencheck();

    if (role === "Branch Head") {
      navigate("/BranchHead");
    } else if (role === "Lead") {
      navigate("/Lead");
    } else if (role === "Executives") {
      navigate("/ExcutiveHomepage");
    } else if (role === "Admin") {
      navigate("/AdminPage");
    } else {
      navigate("/");
    }

  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        error.response?.data?.message ||
        "Something went wrong",
      confirmButtonColor: "#dc2626",
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="login-containerr">
      <div className="login-box">
        <div className="left-side">
          <h1>Lead Management System</h1>
          <p>Welcome Back! Login to continue.</p>

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="login"
          />
        </div>

        <div className="right-side">
          {/* <h2 className="h22">Login</h2> */}

          <form className="formlogin" onSubmit={handleSubmit(onSubmit)}>

            <label>User Type</label>

            <select
                {...register("userType", {
                required: "userType is required",
                })}
            >
                <option value="">Select User Type</option>

                {LoadingRole ? (
                <option>Loading...</option>
                ) : (
                Role?.map((item) => (
                    <option key={item._id} value={item._id}>
                    {item.roleName}
                    </option>
                ))
                )}
            </select>

            <p className="error">{errors.userType?.message}</p>

            <label>Username</label>

            <input
              type="text"
              placeholder="Enter Username"
              {...register("username", {
                required: "Username is required",
              })}
            />

            <p className="error">{errors.username?.message}</p>

            <label>Password</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                })}
              />

              <span
                className="password-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              className="loginbtn"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="login-spinner"></span>
                  Logging in...
                </>
              ) : (
                "LOGIN"
              )}
            </button>

          </form>
        </div>
      </div>
     </div>
  );
}

export default Login;