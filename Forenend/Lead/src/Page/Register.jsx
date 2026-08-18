import React, { useState } from 'react';
import "./Register.css";
import Customhook from "../components/Customhook";
import { useForm } from 'react-hook-form';
import axios from '../Config/axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
function Register() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    Data: Role,
    Loading:LoadingRole,
  } = Customhook("/api/GetRoleregistre");
  // console.log(Role)
  const {
    Data: branches,
    Loading:Loadingbranches,
  } = Customhook("/api/branchesget");
  // console.log(Role)

const onSubmit = async (formData) => {
  // console.log(formData);
  setLoading(true);

  try {
    const { data } = await axios.post("/api/register", formData);

    if (data.success) {

      await Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: data.message,
        confirmButtonColor: "#2563EB",
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      navigate("/AdminPage");

    } else {

      Swal.fire({
        icon: "warning",
        title: "Registration Failed",
        text: data.message,
        confirmButtonColor: "#F59E0B",
      });

    }

  } catch (error) {
    console.log(error);

    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text:
        error.response?.data?.message ||
        "Something went wrong",
      confirmButtonColor: "#DC2626",
    });

  } finally {
    setLoading(false);
  }
};

  return (
    <div className='signupp'>
      <div className='registerr'>
        <h2 className='Registertittlee'>Create Account</h2>

        <form  className="foorrm" onSubmit={handleSubmit(onSubmit)}>


            <select className='Registerinputt'
                {...register("userType", {
                required: "UserType is required",
                })}
            >
                <option className='Registerinputt' value="">Select User Type</option>

                {LoadingRole ? (
                <option>Loading...</option>
                ) : (
                Role?.map((item) => (
                    <option className='Registerinputt' key={item._id} value={item._id}>
                    {item.roleName}
                    </option>
                ))
                )}
            </select>

            <p className="error">{errors.userType?.message}</p>

            <select className='Registerinputt'
                {...register("branch", {
                required: "Branches is required",
                })}
            >
                <option value="">Select Branches Type</option>

                {Loadingbranches ? (
                <option>Loading...</option>
                ) : (
                branches?.map((item) => (
                    <option className='Registerinputt'  key={item._id} value={item._id}>
                    {item.branchName}
                    </option>
                ))
                )}
            </select>

            <p className="error">{errors.userType?.message}</p>

          {/* Username */}
          <input
            className='Registerinputt'
            type='text'
            placeholder='Username'
            {...register("username", { required: "Username is required" })}
          />
          {errors.Username && <p className="error">{errors.Username.message}</p>}
          
          {/* Email */}
          <input
            className='Registerinputt'
            type='email'
            placeholder='Email'
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email"
              }
            })}
          />
          {errors.Email && <p className="error">{errors.Email.message}</p>}

          {/* Phone */}
          <input
            className='Registerinputt'
            type='tel'
            placeholder='Mobile Number'
            {...register("Number", {
              required: "Mobile number is required",
              minLength: {
                value: 10,
                message: "Enter valid number"
              }
            })}
          />
          {errors.Number && <p className="error">{errors.Number.message}</p>}

          {/* Password */}
          <input
            className='Registerinputt'
            type='password'
            placeholder='Password'
            {...register("Password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters"
              }
            })}
          />

          <button type='submit' className='Registersubmitt' disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>

        </form>

        <p className="login-linkk">
          Already have an account? 
          {/* <span onClick={() => navigate("/signin")}> Login</span> */}
        </p>

      </div>
    </div>
  );
}

export default Register;