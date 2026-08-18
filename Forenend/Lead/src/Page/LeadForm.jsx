import React,{useState} from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../Config/axios";
import Customhook from "../components/Customhook";
import "./LeadForm.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const LeadForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const leadNumber = location.state?.leadnumber;
  // console.log(leadNumber)
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    Data: Leadsourceget,
    Loading: sourceLoading,
  } = Customhook("/api/Leadsourceget");
  // console.log(Leadsourceget)
  // const {
  //   Data: districtsget,
  //   Loading: DistrictsLoading,
  // } = Customhook("/api/districtsget");
  // console.log(districtsget)

  const {
    Data: Leadstatus,
    Loading: statusLoading,
  } = Customhook("/api/leadstatusget");
  // console.log(Leadstatus)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const selectedStatus = watch("status");
  const selectedStatusName = Leadstatus?.find(
  (item) => item._id === selectedStatus
)?.name;

  const onSubmit = async (formData) => {

  if (!formData.leadSource) {
    delete formData.leadSource;
  }

  if (!formData.ifCallLater) {
    delete formData.ifCallLater;
  }

  if (!formData.software) {
    delete formData.software;
  }

  if (!formData.referenceDetails) {
    delete formData.referenceDetails;
  }
  // console.log(formData)
    if (isSubmitting) return;

  setIsSubmitting(true);
    try {
      const { data } = await axios.post("/api/Leadcreat", formData);

      if (data.success) {
        reset();

        await Swal.fire({
          title: "Success!",
          text: "Lead Created Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        // console.log(data.demostatus.name)
        // console.log(data.data._id)
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
      // console.log(err);
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }finally{
        setIsSubmitting(false);
    }
  };

  if (sourceLoading || statusLoading) {
  return (
    <div className="leadform-loading">

      <Skeleton height={40} width={250} />

      <div className="leadform-grid">
        {[...Array(8)].map((_, index) => (
          <div className="loading-field" key={index}>
            <Skeleton height={20} width={120} />
            <Skeleton
              height={45}
              style={{ marginTop: "10px", borderRadius: "8px" }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        <Skeleton height={20} width={120} />
        <Skeleton
          height={100}
          style={{ marginTop: "10px", borderRadius: "8px" }}
        />
      </div>

      <div className="loading-buttons">
        <Skeleton height={45} width={140} />
        <Skeleton height={45} width={140} />
      </div>
    </div>
  );
}

  return (
    <div className="body">
      <div className="form-container">

        <h2>Lead Information</h2>

        <form className="foorm" onSubmit={handleSubmit(onSubmit)}>

          {/* Lead Number - Required */}
          <div className="form-group">
            <label>Lead Number</label>

            <input
              value={leadNumber.mobile}
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
              <option value="">Select Lead Source</option>

              {!sourceLoading &&
                Leadsourceget?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          {/* contact Person - Required */}
          <div className="form-group">
            <label>Contact Person</label>

            <input
              placeholder="Contact Person"
              {...register("contactPerson", {
                required: "Contact Person Required",
              })}
            />

            <small>{errors.contactPerson?.message}</small>
          </div>

          {/* District - Required */}
          <div className="form-group">
            <label>District</label>

            <input
              placeholder="Enter District"
              {...register("district", {
                required: "District Required",
              })}
            />

            <small>{errors.district?.message}</small>
          </div>

          {/* City - Required */}
          <div className="form-group">
            <label>City</label>

            <input
              placeholder="Enter City"
              {...register("city", {
                required: "City Required",
              })}
            />

            <small>{errors.city?.message}</small>
          </div>

          {/* Status - Required */}
          <div className="form-group">
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

          {/* Any Software - Optional */}
          <div className="form-group">
            <label>Any Software</label>

            <input
              placeholder="Software Name"
              {...register("software")}
            />
          </div>

          {/* Reference Details - Optional */}
          <div className="form-group">
            <label>Reference Details</label>

            <input
              placeholder="Reference Details"
              {...register("referenceDetails")}
            />
          </div>

          {/* Remarks - Required */}
          {/* Remarks - Only for Demo */}
          {selectedStatusName !=="Demo" && (
            <div className="form-group">
              <label>Remarks</label>

              <textarea
                rows={4}
                {...register("remarks", {
                  required: "Remarks Required",
                })}
              />

              <small>{errors.remarks?.message}</small>
            </div>
          )}

          <div className="button-group">
          <button
            type="submit"
            className="submittt-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="submit-spinner"></span>
                Submitting...
              </>
            ) : (
              "Submit"
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
  );
};

export default LeadForm;