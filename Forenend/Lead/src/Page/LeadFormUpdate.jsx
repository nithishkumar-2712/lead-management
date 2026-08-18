import React, { useEffect ,useState} from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../Config/axios";
import Customhook from "../components/Customhook";
import "./LeadForm.css";

const LeadFormUpdate = () => {
const navigate = useNavigate();
const { id } = useParams();
const location = useLocation();

const leadData = location.state;
console.log(leadData)
const [isSubmitting, setIsSubmitting] = useState(false);
const {
  register,
  handleSubmit,
  reset,
  formState: { errors },
} = useForm();

useEffect(() => {
  if (leadData) {
    reset({
      mobile: leadData.mobile || "",
      software: leadData.anySoftware || "",
    });
  }
}, [leadData, reset]);


  const {
    Data: Leadsourceget,
    Loading: sourceLoading,
  } = Customhook("/api/Leadsourceget");

  const {
    Data: Leadstatus,
    Loading: statusLoading,
  } = Customhook("/api/leadstatusget");


const onSubmit = async (formData) => {
  // console.log(formData)
    if (!formData.leadSource) {
    delete formData.leadSource;
  }
  if (isSubmitting) return;

  setIsSubmitting(true);
  try {
    // console.log(formData);

    const { data } = await axios.put(`/api/leadreayupdate/${id}`, formData);

    if (data.success) {
        // console.log(data.data.status)
        reset();
        await Swal.fire({
          title: "Success!",
          text: "Lead Update Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        if(data.demostatus.name==="Demo"){
            navigate(`/LeadUpdate/${data.data._id}`, {
          state: {
            leadData: data.data,
          },
        });
        }else{
          navigate("/Lead");
        }
    } else {
      Swal.fire({
        title: "Failed!",
        text: data.message,
        icon: "warning",
      });
    }
  } catch (err) {
    Swal.fire({
      title: "Error!",
      text: err.response?.data?.message || "Something went wrong",
      icon: "error",
    });
    console.log(err.message)
  }finally{
    setIsSubmitting(false);
  }
};

  return (
    <>
      <div className="body">
        <div className="form-container">

          <h2>Lead Information</h2>

          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Lead Number - Required */}
            <div className="form-group">
              <label>Lead Number</label>

              <input
              value={leadData.mobile}
                readOnly
                {...register("mobile", {
                  required: "Lead Number Required",
                })}
              />

              <small>{errors.mobile?.message}</small>
            </div>

            {/* Lead Source - Optional */}
            <div className="form-group">
              <label>Lead Source</label>

              <select {...register("leadSource")}>
                {leadData?.leadSource?._id ? (
                  <option value={leadData.leadSource._id}>
                    {leadData.leadSource.name}
                  </option>
                ) : (
                  <option value="">
                    Select Lead Source
                  </option>
                )}

                {!sourceLoading &&
                  Leadsourceget?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Location - Required */}
            <div className="form-group">
              <label>Location</label>

              <input
              defaultValue={leadData.district}
                placeholder="Enter Location"
                {...register("location", {
                  required: "Location Required",
                })}
              />

              <small>{errors.location?.message}</small>
            </div>

            {/* Status - Required */}
            <div className="form-group">
              <label>Status</label>

              <select
                {...register("status", {
                  required: "Status Required",
                })}
              >
                <option value={leadData.status._id}>{leadData.status.name}</option>

                {!statusLoading &&
                  Leadstatus?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>

              <small>{errors.status?.message}</small>
            </div>

            {/* If Call Later - Optional */}
            <div className="form-group">
              <label>Contact Person</label>

              <input
                type="test"
                defaultValue={leadData.contactPerson}
                placeholder="Contact Person"
                {...register("contactPerson")}
              />
            </div>

            {/* Any Software - Optional */}
            <div className="form-group">
              <label>Any Software</label>

              <input
              defaultValue={leadData.software}
                placeholder="Software Name"
                {...register("software")}
              />
            </div>

            {/* Reference Details - Optional */}
            <div className="form-group">
              <label>Reference Details</label>

              <input
              defaultValue={leadData.referenceDetails}
                placeholder="Reference Details"
                {...register("referenceDetails")}
              />
            </div>


            {/* Remarks - Required */}
            <div className="form-group full-width">
              <label>Remarks</label>

              <textarea
              value={leadData.remarks}
                rows={4}
                {...register("remarks", {
                  required: "Remarks Required",
                })}
              />

              <small>{errors.remarks?.message}</small>
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
                Cancel
              </button>

            </div>

          </form>

        </div>
      </div>
    </>
  );
};

export default LeadFormUpdate;