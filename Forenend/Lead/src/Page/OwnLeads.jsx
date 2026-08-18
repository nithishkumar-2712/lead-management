import React,{useState}from 'react'
import "./OwnLeads.css";
import Customhook from "../components/Customhook";
import { useForm } from "react-hook-form";
import axios from '../Config/axios';
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
 function OwnLeads() {
     const navigate = useNavigate();
     const [isSaving, setIsSaving] = useState(false);
    const {
      register,
      handleSubmit,
      reset,
      watch,
      formState: { errors },
    } = useForm();
   // Leadsource
    const {
      Data: Leadsourceget,
      Loading: sourceLoading,
    } = Customhook("/api/Leadsourceget");
    // Status
    const {
      Data: Leadstatus,
      Loading: statusLoading,
    } = Customhook("/api/leadstatusget");
    // Branch
    const {
      Data: Leadbranches,
      Loading: LeadbranchesLoading,
    } = Customhook("/api/branchesget");

    // Businesstype
    const {
      Data: Leadbusinesstype,
      Loading: LeadbusinesstypeLoading,
    } = Customhook("/api/businesstypegett");

    const selectedStatus = watch("status");
    selectedStatus === "Success"
    const selectedStatusName = Leadstatus?.find(
        (item) => item._id === selectedStatus
    )?.name;

    const SuccessStatus = selectedStatusName === "Success";

const onSubmit = async (formData) => {
  try {
    setIsSaving(true);
    const { data } = await axios.post(
      "/api/CreatOwnlead",
      formData
    );

    if (data.success) {
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: data.message || "Lead Created Successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/Executives");
    } else {
      Swal.fire({
        icon: "warning",
        title: "Failed!",
        text: data.message || "Lead creation failed",
      });
    }

  } catch (error) {
    console.log(error.message);

    Swal.fire({
      icon: "error",
      title: "Error!",
      text:
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
    });
  }finally {
    setIsSaving(false);
  }
};

  return (
    <>

      <div className="own-lead-container">

        <div className="own-lead-header">
          <h2>Own Lead</h2>
          <p>Enter new lead information</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lead-form-card">

            <div className="section-title">
              <span>👤</span>
              <h3>Customer Information</h3>
            </div>

            <div className="lead-grid">

              <div className="lead-input-group">
                <label>Mobile</label>
                <input
                  type="text"
                  placeholder="Enter mobile number"
                  {...register("mobile", {
                    required: "Lead Number Required",
                  })}
                />
                <small>{errors.mobile?.message}</small>
              </div>

              <div className="lead-input-group">
                <label>Contact Person</label>
                <input
                  type="text"
                  placeholder="Enter contact person"
                  {...register("contactPerson", {
                    required: "Contact Person is required",
                  })}
                />
                <small className="error">{errors.contactPerson?.message}</small>
              </div>

              <div className="lead-input-group">
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

              <div className="lead-input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                {...register("emailId")}
                />
              </div>

              <div className="lead-input-group full">
                <label>Address</label>
                <textarea
                  placeholder="Enter complete address"
                {...register("address")}
                />
              </div>

            </div>


            <div className="section-title">
              <span>💼</span>
              <h3>Business Information</h3>
            </div>

            <div className="lead-grid">

              <div className="lead-input-group">
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

              {/* <div className="lead-input-group">
                <label>Software</label>
                  <input
                    type="text"
                    placeholder="Enter software"
                    {...register("software")}
                  />

                  <small className="error">
                    {errors.software?.message}
                  </small>
              </div> */}

              <div className="lead-input-group">
                <label>District</label>
                <input
                  placeholder="Enter District"
                  {...register("district", {
                    required: "District Required",
                  })}
                />

                <small>{errors.district?.message}</small>
              </div>

              <div className="lead-input-group">
                <label>City</label>
                <input
                  placeholder="Enter City"
                  {...register("city", {
                    required: "City Required",
                  })}
                />

                <small>{errors.city?.message}</small>
              </div>

              {/* <div className="lead-input-group">
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
              </div> */}

              <div className="lead-input-group">
                <label>Lead Source</label>
                    <select {...register("leadSource")}>
                      <option value="">Select Lead Source</option>

                      {!sourceLoading &&
                        Leadsourceget?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
              </div>

            </div>


            <div className="section-title">
              <span>📊</span>
              <h3>Lead Details</h3>
            </div>

            <div className="lead-grid">

              <div className="lead-input-group">
                <label>Status</label>
                <select
                  {...register("status", {
                    required: "Status Required",
                  })}
                >
                  <option value="">Select Status</option>

                  {!statusLoading &&
                    Leadstatus?.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </select>

                <small>{errors.status?.message}</small>
              </div>

              <div className="lead-input-group">
                <label>Priority</label>
                  <select {...register("priority")}>
                    <option value="">Assign Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
              </div>

              <div className="lead-input-group">
                <label>Demo Date</label>
                <input
                  type="date"
                  {...register("demoDate")}
                />
              </div>

              <div className="lead-input-group full">
                <label>Reference Details</label>
                <textarea
                  placeholder="Enter reference details"
                  {...register("referenceDetails")}
                />
              </div>

              <div className="lead-input-group full">
                <label>Remarks</label>
                <textarea
                  placeholder="Enter remarks"
                  {...register("remarks")}
                />
              </div>

            </div>

            {/* Success Details */}
            {SuccessStatus && (
              <>
                <div className="section-title success-section-title">
                  <span>✅</span>
                  <h3>Success Details</h3>
                </div>

                <div className="lead-grid success-lead-grid">

                  {/* License */}
                  <div className="lead-input-group">
                    <label>License Id</label>

                    <input
                      type="text"
                      placeholder="Enter License"
                      {...register("license", {
                        required: SuccessStatus
                          ? "License is required"
                          : false,
                      })}
                    />

                    <small className="error">
                      {errors.license?.message}
                    </small>
                  </div>


                  {/* Installation Date */}
                  <div className="lead-input-group">
                    <label>Installation Date</label>

                    <input
                      type="date"
                      {...register("installationDate", {
                        required: SuccessStatus
                          ? "Installation Date is required"
                          : false,
                      })}
                    />

                    <small className="error">
                      {errors.installationDate?.message}
                    </small>
                  </div>


                  {/* Software Name */}
                  <div className="lead-input-group">
                    <label>Software Name</label>

                    <input
                      type="text"
                      placeholder="Enter Software Name"
                      {...register("softwareName", {
                        required: SuccessStatus
                          ? "Software Name is required"
                          : false,
                      })}
                    />

                    <small className="error">
                      {errors.softwareName?.message}
                    </small>
                  </div>

                </div>
              </>
            )}
            <div className="lead-form-actions">
              <button
                type="submit"
                className="update-btn"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <span className="button-spinner"></span>
                    Saving...
                  </>
                ) : (
                  "Save Lead"
                )}
              </button>
            </div>

          </div>
        </form>
      </div>
      
    </>
  )
}
export default OwnLeads