import React, { useState } from "react";
import "./Creatstatus.css";
import "./LeadManagement.css";
import Customhook from "../components/Customhook";
import axios from "../Config/axios";
import Swal from "sweetalert2";
function AdminInsulationpage() {
    const {
        Data: Leadget,
        Loading: LeadLoading,
        CustomHook
    } = Customhook("/api/Allinsulatrion");
    console.log(Leadget);
const [viewLead, setViewLead] = useState(null);
const [showViewModal, setShowViewModal] = useState(false);

const handleEview = (item) => {
  setViewLead(item);
  setShowViewModal(true);
};

  const handleDelete = async (id, isDeleted) => {
    console.log(id,isDeleted)

    const result = await Swal.fire({
      title: isDeleted
        ? "Activate Lead?"
        : "Deactivate Lead?",
      text: isDeleted
        ? "Do you want to activate this Lead?"
        : "Do you want to deactivate this Lead?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563EB",
      cancelButtonColor: "#DC2626",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {

      const { data } = await axios.put(`/api/Licencedelete/${id}`, {
        isActive: !isDeleted,
      });

      if (data.success) {

        await Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
          confirmButtonColor: "#2563EB",
          timer: 2000,
          showConfirmButton: false,
        });

        CustomHook();

      } else {

        Swal.fire({
          icon: "warning",
          title: "Failed",
          text: data.message,
          confirmButtonColor: "#F59E0B",
        });

      }

    } catch (error) {

      // console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        confirmButtonColor: "#DC2626",
      });

    }
  };
  if (LeadLoading) {
  return (
    <div className="users-page">

      <div className="users-header">
        <div className="sk-title"></div>
      </div>

      <div className="users-skeleton-table">

        {[...Array(6)].map((_, i) => (
          <div className="sk-row" key={i}>

            <div className="sk-box sm"></div>

            <div className="sk-user">
              <div className="sk-avatar"></div>
              <div className="sk-line"></div>
            </div>

            <div className="sk-line lg"></div>

            <div className="sk-badge"></div>

            <div className="sk-actions">
              <div className="sk-btn"></div>
              <div className="sk-btn"></div>
              <div className="sk-btn"></div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}
  return (
    <>
        <div className="table-header body">
          <h2>Insulation Management</h2>
        </div>
{Leadget && Leadget.length > 0 ? (
  <div className="table-container">

    <table className="crud-table">

      <thead>
        <tr>
          <th>S.No</th>
          <th>View</th>
          <th>Delete</th>
          <th>Status</th>
          {/* <th>Status</th> */}
          <th>softwareName</th>
          <th>licenseId</th>
          <th>installationDate</th>
          <th>companyName</th>
          <th>contactNo</th>
          <th>Assigned User</th>
          <th>Branch Head</th>
          <th>InstalBy</th>
          <th>Status</th>

        </tr>
      </thead>

      <tbody>
        {Leadget.map((item, index) => (
          <tr key={item._id}>

            <td>{index + 1}</td>
            <td>
              <button
                className="edit-btn"
                onClick={() => handleEview(item)}
              >
                View
              </button>
            </td>

            <td>
              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(item._id, item.isActive)
                }
              >
                {item.isActive ? "Deactivate" : "Activate"}
              </button>
            </td>

            <td>
              <span
                className={
                  item.isActive
                    ? "activvee"
                    : "inactivvee"
                }
              >
                {item.isActive ? "active" : "inactive"}
              </span>
            </td>

            <td>{item.softwareName ?? "-"}</td>

            <td>{item.licenseId ?? "-"}</td>

            <td>
              {item.installationDate?.substring(0, 10) ?? "-"}
            </td>

            <td>
              {item.leadId?.companyName ?? "-"}
            </td>

            <td>
              {item.leadId?.contactNo ?? "-"}
            </td>

            {/* <td>
              {item.leadId?.assignBranch?.branchName ?? "-"}
            </td> */}

            <td>
              {item.leadId?.assignedUser?.username ?? "-"}
            </td>

            <td>
              {item.leadId?.assignBranchHead?.username ?? "-"}
            </td>

            <td>
              {item.leadId?.assignedExecutive?.username ?? "-"} 
            </td>

            {/* <td>
              {item.updatedAt?.substring(0, 10) ?? "-"}
            </td> */}

            {/* <td>
              {item.leadId?.priority ?? "-"}
            </td> */}

            <td>
              {item.leadId?.status?.name ?? "-"}
            </td>

            {/* <td>{item._id ?? "-"}</td> */}

          </tr>
        ))}
      </tbody>

    </table>

  </div>
) : (
  <div className="no-data">

    <div className="no-data-icon">
      📋
    </div>

    <h3>No Installation Found</h3>

    <p>
      There are no Installation available.
    </p>

  </div>
)}
{showViewModal && viewLead && (
  <div className="leadview-overlay">
    <div className="leadview-modal">

      <div className="leadview-header">
        <h2>Installation Details</h2>

        <button
          className="leadview-close-btn"
          onClick={() => setShowViewModal(false)}
        >
          ✕
        </button>
      </div>

      <div className="leadview-body">

        {/* Customer Details */}
        <div className="leadview-card">
          <h3>Customer Details</h3>

          <div className="leadview-grid">

            <div>
              <strong>Customer ID</strong>
              <span>{viewLead?._id || "N/A"}</span>
            </div>

            <div>
              <strong>Contact Person</strong>
              <span>{viewLead?.leadId?.contactPerson || "N/A"}</span>
            </div>

            <div>
              <strong>Company</strong>
              <span>{viewLead?.leadId?.companyName || "N/A"}</span>
            </div>

            <div>
              <strong>Mobile</strong>
              <span>{viewLead?.leadId?.mobile || "N/A"}</span>
            </div>

            <div>
              <strong>Email</strong>
              <span>{viewLead?.leadId?.emailId || "N/A"}</span>
            </div>

            <div>
              <strong>Address</strong>
              <span>{viewLead?.leadId?.address || "N/A"}</span>
            </div>

          </div>
        </div>


        {/* Installation Information */}
        <div className="leadview-card">
          <h3>Installation Information</h3>

          <div className="leadview-grid">

            <div>
              <strong>License ID</strong>
              <span>{viewLead?.licenseId || "N/A"}</span>
            </div>

            <div>
              <strong>Software</strong>
              <span>{viewLead?.softwareName || "N/A"}</span>
            </div>

            <div>
              <strong>Status</strong>
              <span>
                {viewLead?.leadId?.status?.name || "N/A"}
              </span>
            </div>

            <div>
              <strong>Priority</strong>
              <span>
                {viewLead?.leadId?.priority || "N/A"}
              </span>
            </div>

            <div>
              <strong>Reference</strong>
              <span>
                {viewLead?.leadId?.city || "N/A"}
              </span>
            </div>

            <div>
              <strong>Reason Reject</strong>
              <span>
                {viewLead?.leadId?.referenceDetails || "N/A"}
              </span>
            </div>

          </div>
        </div>


        {/* Assignment Details */}
        <div className="leadview-card">
          <h3>Assignment Details</h3>

          <div className="leadview-grid">

            <div>
              <strong>Branch</strong>
              <span>
                {viewLead?.leadId?.assignBranch?.branchName || "N/A"}
              </span>
            </div>

            <div>
              <strong>Branch Head</strong>
              <span>
                {viewLead?.leadId?.assignBranchHead?.username || "N/A"}
              </span>
            </div>

            <div>
              <strong>Executive</strong>
              <span>
                {viewLead?.leadId?.assignedExecutive?.username || "N/A"}
              </span>
            </div>

            <div>
              <strong>Assigned User</strong>
              <span>
                {viewLead?.leadId?.assignedUser?.username || "N/A"}
              </span>
            </div>

          </div>
        </div>


        {/* Date Details */}
        <div className="leadview-card">
          <h3>Date Details</h3>

          <div className="leadview-grid">

            <div>
              <strong>Installation Date</strong>
              <span>
                {viewLead?.installationDate
                  ? viewLead.installationDate.substring(0, 10)
                  : "N/A"}
              </span>
            </div>

            <div>
              <strong>Created</strong>
              <span>
                {viewLead?.createdAt
                  ? viewLead.createdAt.substring(0, 10)
                  : "N/A"}
              </span>
            </div>

            <div>
              <strong>Updated</strong>
              <span>
                {viewLead?.updatedAt
                  ? viewLead.updatedAt.substring(0, 10)
                  : "N/A"}
              </span>
            </div>

          </div>
        </div>


        {/* Remarks */}
        <div className="leadview-card">
          <h3>Remarks</h3>

          <div className="leadview-remarks">
            {viewLead?.leadId.remarks || "N/A"}
          </div>
        </div>

      </div>


      {/* Footer */}
      <div className="leadview-footer">
        <button
          className="leadview-cancel-btn"
          onClick={() => setShowViewModal(false)}
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}
      
    </>
  )
}
export default AdminInsulationpage