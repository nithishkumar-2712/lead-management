import React,{useState} from "react";
import { useForm } from "react-hook-form";
import "./LeadUpdate.css";
import Swal from "sweetalert2";
import Customhook from "../components/Customhook";
import axios from "../Config/axios";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function LeadUpdate() {
const { id } = useParams(); 
// console.log(id)
const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const leadData = location.state?.leadData;

  // console.log(leadData);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
    const {
    Data: Leadbranches,
    Loading: LeadbranchesLoading,
  } = Customhook("/api/branchesget");
  // console.log(Leadbranches)
    const {
    Data: branchhead,
    Loading: Loadingbranchhead,
  } = Customhook("/api/branch-heads");
  // console.log(branchhead)
  const {
  Data: Executives,
  Loading: LoadingExecutives,
} = Customhook("/api/executives-User");
// console.log(Executives)
    const {
    Data: Leadbusinesstype,
    Loading: LeadbusinesstypeLoading,
  } = Customhook("/api/businesstypegett");
const onSubmit = async (formData) => {
    if (isSubmitting) return;

  setIsSubmitting(true);

  try {
    const { data } = await axios.put(
      `/api/leadupdate/${id}`,
      formData
    );

    if (data.success) {
      reset();

      await Swal.fire({
        title: "Success!",
        text: "Lead Updated Successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      // console.log(data.demostatus);

      navigate("/Lead");
    } else {
      Swal.fire({
        title: "Failed!",
        text: data.message,
        icon: "warning",
      });
    }
  } catch (error) {
    console.error(error);

    Swal.fire({
      title: "Error!",
      text: error.response?.data?.message || error.message || "Something went wrong",
      icon: "error",
    });
  }finally{
    setIsSubmitting(false);
  }
};
if (LeadbranchesLoading ||LeadbusinesstypeLoading) {
  return (
    <div className="leadupdate-loading">

      <Skeleton height={40} width={250} />

      <div className="leadupdate-grid">
        {[...Array(14)].map((_, index) => (
          <div className="loading-field" key={index}>
            <Skeleton height={20} width={130} />
            <Skeleton
              height={45}
              style={{
                marginTop: "10px",
                borderRadius: "8px",
              }}
            />
          </div>
        ))}
      </div>

      <div className="loading-textarea">
        <Skeleton height={20} width={120} />
        <Skeleton
          height={100}
          style={{
            marginTop: "10px",
            borderRadius: "8px",
          }}
        />
      </div>

      <div className="loading-textarea">
        <Skeleton height={20} width={120} />
        <Skeleton
          height={100}
          style={{
            marginTop: "10px",
            borderRadius: "8px",
          }}
        />
      </div>

      <div className="loading-buttons">
        <Skeleton height={45} width={150} />
        <Skeleton height={45} width={150} />
      </div>

    </div>
  );
}

  return (
    <>
    <div className="body">
      <div className="form-container">
        <h2>Lead Update</h2>

        <form  className="fform" onSubmit={handleSubmit(onSubmit)}>

          {/* Contact Person */}
          <div className="form-group">
            <label>Contact Person</label>
            <input
              type="text"
              value={leadData.contactPerson || ""}
              placeholder="Enter Contact Person"
              {...register("contactPerson", {
                required: "Contact Person is required",
              })}
            />
            <small className="error">{errors.contactPerson?.message}</small>
          </div>

          {/* Company Name */}
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              placeholder="Enter Company Name"
              {...register("companyName", {
                required: "Company Name is required",
              })}
            />
            <small className="error">{errors.companyName?.message}</small>
          </div>

          {/* Business Type */}
          <div className="form-group">
            <label>Business Type</label>

            <select
              {...register("businessType", {
                required: "Business Type is required",
              })}
            >
              <option value="">Select Business Type</option>

              {LeadbusinesstypeLoading ? (
                <option>Loading...</option>
              ) : (
                Leadbusinesstype?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))
              )}
            </select>

            <small className="error">
              {errors.businessType?.message}
            </small>
          </div>

          {/* Contact Number */}
          <div className="form-group">
            <label>Contact No</label>
            <input
              type="tel"
              placeholder="Enter Contact Number"
              value={leadData.mobile || ""}
              {...register("contactNo", {
                required: "Contact Number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter valid 10 digit number",
                },
              })}
            />
            <small className="error">{errors.contactNo?.message}</small>
          </div>

          {/* Branch */}
          <div className="form-group">
            <label>Assign Branch</label>

            <select
              {...register("assignBranch", {
                required: "Branch is required",
              })}
            >
              <option value="">Select Branch</option>

              {LeadbranchesLoading ? (
                <option>Loading...</option>
              ) : (
                Leadbranches?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.branchName}
                  </option>
                ))
              )}
            </select>

            <small className="error">
              {errors.assignBranch?.message}
            </small>
          </div>
          {/* Priority */}
          <div className="form-group">
            <label>Priority</label>
            <select {...register("priority")}>
              <option value="">Assign Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email Id</label>
            <input
              type="email"
              placeholder="Enter Email Id"
              {...register("emailId", {
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid Email",
                },
              })}
            />
            <small className="error">{errors.email?.message}</small>
          </div>

          {/* Demo Date */}
          <div className="form-group">
            <label>Demo Date</label>
            <input
              type="date"
              {...register("demoDate")}
            />
          </div>

          {/* Remarks */}
          <div className="form-group">
            <label>Remarks</label>
            <textarea
              placeholder="Enter Remarks"
              {...register("remarks")}
            />
          </div>

          <div className="button-group">
              <button
                type="submit"
                className="submittt-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="submit-spinner"></span>
                    Updatining...
                  </>
                ) : (
                  "Update"
                )}
              </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => reset()}
            >
              Reset
            </button>
          </div>

        </form>
      </div>
    </div>
    </>
  );
}

export default LeadUpdate;