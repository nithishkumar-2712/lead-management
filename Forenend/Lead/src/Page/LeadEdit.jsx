import React, { useEffect, useState } from "react";
import "./LeadEdit.css";
import axios from "../Config/axios";
import Customhook from "../components/Customhook";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function LeadEdit() {
  const [searchId, setSearchId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // =========================================================
  // REACT HOOK FORM
  // =========================================================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      leadId: "",
      leadDate: "",
      leadSource: "",
      contactPerson: "",
      mobile: "",
      altMobile: "",
      companyName: "",
      businessType: "",
      location: "",
      demoDate: "",
      remarks: "",
      status: "",
      assignBranch: "",
      priority: "Medium",
      address: "",
      preferredLanguage: "",
      city: "",
      district: "",
      software: "",
    },
  });

  // =========================================================
  // GET BRANCHES
  // =========================================================

  const {
    Data: Leadbranches,
    Loading: LeadbranchesLoading,
  } = Customhook("/api/branchesget");

  // =========================================================
  // GET LEAD SOURCES
  // =========================================================

  const {
    Data: Leadsourceget,
    Loading: sourceLoading,
  } = Customhook("/api/Leadsourceget");

  // =========================================================
  // GET BRANCH HEADS
  // =========================================================

  const {
    Data: branchhead,
    Loading: Loadingbranchhead,
  } = Customhook("/api/branch-heads");

  // =========================================================
  // GET EXECUTIVES
  // =========================================================

  const {
    Data: Executives,
    Loading: LoadingExecutives,
  } = Customhook("/api/executives-User");

  // =========================================================
  // GET BUSINESS TYPES
  // =========================================================

  const {
    Data: Leadbusinesstype,
    Loading: LeadbusinesstypeLoading,
  } = Customhook("/api/businesstypegett");

  // =========================================================
  // GET STATUS
  // =========================================================

  const {
    Data: Leadstatus,
    Loading: statusLoading,
  } = Customhook("/api/leadstatusget");

  // =========================================================
  // SEARCH LEAD
  // =========================================================

const searchLead = async () => {
  if (!searchId.trim()) {
    Swal.fire({
      icon: "warning",
      title: "Lead ID Required",
      text: "Please enter Lead ID",
      confirmButtonText: "OK",
    });

    return;
  }

  try {
    const { data } = await axios.get(
      `/api/lead/search/${searchId.trim()}`
    );

    // console.log("SEARCH RESPONSE:", data);

    if (data.success && data.data) {
      const lead = data.data;

      // console.log("Lead Data:", lead);

      // =====================================================
      // API DATA -> REACT HOOK FORM
      // =====================================================

      reset({
        leadId: lead._id || "",

        leadDate: lead.createdAt
          ? lead.createdAt.split("T")[0]
          : "",

        leadSource:
          typeof lead.leadSource === "object"
            ? lead.leadSource?._id || ""
            : lead.leadSource || "",

        contactPerson:
          lead.contactPerson || "",

        mobile: lead.mobile || "",

        altMobile:
          lead.alternateContactNo ||
          lead.altMobile ||
          "",

        companyName:
          lead.companyName || "",

        businessType:
          typeof lead.businessType === "object"
            ? lead.businessType?._id || ""
            : lead.businessType || "",

        location:
          lead.location ||
          lead.district ||
          "",

        demoDate: lead.demoDate
          ? lead.demoDate.split("T")[0]
          : "",

        remarks: lead.remarks || "",

        status:
          typeof lead.status === "object"
            ? lead.status?._id || ""
            : lead.status || "",

        assignBranch:
          typeof lead.assignBranch === "object"
            ? lead.assignBranch?._id || ""
            : lead.assignBranch || "",

        priority:
          lead.priority || "Medium",

        address:
          lead.address || "",

        preferredLanguage:
          lead.preferredLanguage || "",

        city:
          lead.city || "",

        district:
          lead.district || "",

        software:
          lead.software || "",
      });

      setShowForm(true);

      // =====================================================
      // SUCCESS SWEET ALERT
      // =====================================================

      Swal.fire({
        icon: "success",
        title: "Lead Found",
        text: "Lead details loaded successfully",
        timer: 1500,
        showConfirmButton: false,
      });

    } else {

      // =====================================================
      // LEAD NOT FOUND
      // =====================================================

      Swal.fire({
        icon: "error",
        title: "Lead Not Found",
        text:
          data.message ||
          "No lead found with this Lead ID",
        confirmButtonText: "OK",
      });

      setShowForm(false);
    }

  } catch (err) {

    // console.log(
    //   "Search Lead Error:",
    //   err.response?.data || err.message
    // );

    // =====================================================
    // API / SERVER ERROR
    // =====================================================

    Swal.fire({
      icon: "error",
      title: "Search Failed",
      text:
        err.response?.data?.message ||
        "Lead Not Found",
      confirmButtonText: "OK",
    });

    setShowForm(false);
  }
};

  // =========================================================
  // UPDATE LEAD
  // =========================================================

const updateLead = async (formData) => {
  console.log("UPDATE FORM DATA:", formData);

  try {
    const response = await axios.put(
      `/api/lead/update/${formData.leadId}`,
      formData
    );

    // console.log("UPDATE RESPONSE:", response.data);

    if (response.data?.success) {
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text:
          response.data?.message ||
          "Lead Updated Successfully",
        confirmButtonText: "OK",
      });

      // Success after alert
      navigate("/Lead");
    } else {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          response.data?.message ||
          "Unable to update lead",
      });
    }

  } catch (err) {
    // console.log(
    //   "Update Lead Error:",
    //   err.response?.data || err.message
    // );

    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text:
        err.response?.data?.message ||
        "Something went wrong while updating the lead",
    });
  }
};
  // =========================================================
  // OPTIONAL - LOG DATA
  // =========================================================

  useEffect(() => {
  }, [
    Leadsourceget,
    Leadstatus,
    Leadbusinesstype,
    Leadbranches,
  ]);

  return (
    <div className="crm-container body">

      <h2>Lead Edit</h2>

      {/* =====================================================
          SEARCH
      ====================================================== */}

      <div className="section">
        <h3>Search Lead</h3>

        <div className="search-boox">

          <input
            type="text"
            placeholder="Enter Lead ID"
            value={searchId}
            onChange={(e) =>
              setSearchId(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchLead();
              }
            }}
          />

          <button
            type="button"
            className="button"
            onClick={searchLead}
          >
            Search
          </button>

        </div>
      </div>

      {/* =====================================================
          EDIT FORM
      ====================================================== */}

      {showForm && (
        <form
          onSubmit={handleSubmit(updateLead)}
        >

          {/* =================================================
              LEAD INFORMATION
          ================================================== */}

          <div className="section">

            <h3>Lead Information</h3>

            <div className="row">

              {/* Lead ID */}
              <div className="field">

                <label>Lead ID</label>

                <input
                  type="text"
                  {...register("leadId")}
                  readOnly
                />

              </div>

              {/* Lead Date */}
              <div className="field">

                <label>Lead Date</label>

                <input
                  type="date"
                  {...register("leadDate")}
                />

              </div>

              {/* Lead Source */}
              <div className="field">

                <label>Lead Source</label>

                <select
                  {...register("leadSource", {
                    required:
                      "Lead Source is required",
                  })}
                >

                  <option value="">
                    Select Lead Source
                  </option>

                  {sourceLoading ? (
                    <option value="">
                      Loading...
                    </option>
                  ) : (
                    Leadsourceget?.map((item) => (
                      <option
                        key={item._id}
                        value={item._id}
                      >
                        {item.name}
                      </option>
                    ))
                  )}

                </select>

                {errors.leadSource && (
                  <small className="error">
                    {errors.leadSource.message}
                  </small>
                )}

              </div>

            </div>
          </div>

          {/* =================================================
              CONTACT DETAILS
          ================================================== */}

          <div className="section">

            <h3>Contact Details</h3>

            <div className="row">

              {/* Location */}
              <div className="field">

                <label>Location</label>

                <input
                  type="text"
                  {...register("location")}
                />

              </div>

              {/* Mobile */}
              <div className="field">

                <label>Mobile</label>

                <input
                  type="text"
                  {...register("mobile", {
                    required:
                      "Mobile is required",
                  })}
                />

                {errors.mobile && (
                  <small className="error">
                    {errors.mobile.message}
                  </small>
                )}

              </div>

              {/* Status */}
              <div className="field">

                <label>Status</label>

                <select
                  {...register("status", {
                    required:
                      "Status is required",
                  })}
                >

                  <option value="">
                    Select Status
                  </option>

                  {statusLoading ? (
                    <option value="">
                      Loading...
                    </option>
                  ) : (
                    Leadstatus?.map((item) => (
                      <option
                        key={item._id}
                        value={item._id}
                      >
                        {item.name}
                      </option>
                    ))
                  )}

                </select>

                {errors.status && (
                  <small className="error">
                    {errors.status.message}
                  </small>
                )}

              </div>

              {/* City */}
              <div className="field">

                <label>City</label>

                <input
                  type="text"
                  {...register("city")}
                />

              </div>

              {/* District */}
              <div className="field">

                <label>District</label>

                <input
                  type="text"
                  {...register("district")}
                />

              </div>

              {/* Software */}
              <div className="field">

                <label>Software</label>

                <input
                  type="text"
                  {...register("software")}
                />

              </div>

              {/* Priority */}
              <div className="field">

                <label>Priority</label>

                <select
                  {...register("priority")}
                >

                  <option value="">
                    Select Priority
                  </option>

                  <option value="High">
                    High
                  </option>

                  <option value="Medium">
                    Medium
                  </option>

                  <option value="Low">
                    Low
                  </option>

                </select>

              </div>

            </div>
          </div>

          {/* =================================================
              COMPANY DETAILS
          ================================================== */}

          <div className="section">

            <h3>Company Details</h3>

            <div className="row">

              {/* Company Name */}
              <div className="field">

                <label>Company Name</label>

                <input
                  type="text"
                  {...register("companyName")}
                />

              </div>

              {/* Business Type */}
              <div className="field">

                <label>Business Type</label>

                <select
                  {...register("businessType", {
                    required:
                      "Business Type is required",
                  })}
                >

                  <option value="">
                    Select Business Type
                  </option>

                  {LeadbusinesstypeLoading ? (
                    <option value="">
                      Loading...
                    </option>
                  ) : (
                    Leadbusinesstype?.map((item) => (
                      <option
                        key={item._id}
                        value={item._id}
                      >
                        {item.name}
                      </option>
                    ))
                  )}

                </select>

                {errors.businessType && (
                  <small className="error">
                    {errors.businessType.message}
                  </small>
                )}

              </div>

              {/* Contact Person */}
              <div className="field">

                <label>Contact Person</label>

                <input
                  type="text"
                  {...register("contactPerson")}
                />

              </div>

            </div>
          </div>

          {/* =================================================
              DEMO DETAILS
          ================================================== */}

          <div className="section">

            <h3>Demo Details</h3>

            <div className="row">

              {/* Demo Date */}
              <div className="field">

                <label>Demo Date</label>

                <input
                  type="date"
                  {...register("demoDate")}
                />

              </div>

              {/* Branch */}
              <div className="field">

                <label>Branch</label>

                <select
                  {...register("assignBranch", {
                    required:
                      "Branch is required",
                  })}
                >

                  <option value="">
                    Select Branch
                  </option>

                  {LeadbranchesLoading ? (
                    <option value="">
                      Loading...
                    </option>
                  ) : (
                    Leadbranches?.map((item) => (
                      <option
                        key={item._id}
                        value={item._id}
                      >
                        {item.branchName}
                      </option>
                    ))
                  )}

                </select>

                {errors.assignBranch && (
                  <small className="error">
                    {errors.assignBranch.message}
                  </small>
                )}

              </div>

              {/* Address */}
              <div className="field">

                <label>Address</label>

                <input
                  type="text"
                  {...register("address")}
                />

              </div>


              {/* Remarks */}
              <div className="field">

                <label>Remarks</label>

                <textarea
                  {...register("remarks")}
                />

              </div>

            </div>

            {/* =================================================
                BUTTON
            ================================================== */}

            <button
              type="submit"
              className="button"
            >
              Update Lead
            </button>

          </div>

        </form>
      )}

    </div>
  );
}

export default LeadEdit;