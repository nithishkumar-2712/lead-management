import React, { useState } from "react";
import "./Creatstatus.css";
import "./LeadManagement.css";
import Customhook from "../components/Customhook";
import axios from "../Config/axios";
import Swal from "sweetalert2";
function LeadManagement() {
    const {
        Data: Leadget,
        Loading: LeadLoading,
        CustomHook
    } = Customhook("/api/leadget");
    console.log(Leadget);
const [viewLead, setViewLead] = useState(null);
const [showViewModal, setShowViewModal] = useState(false);

const handleEview = (item) => {
  setViewLead(item);
  setShowViewModal(true);
};

  const handleDelete = async (id, isDeleted) => {
    // console.log(id,isDeleted)

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

      const { data } = await axios.put(`/api/leaddelete/${id}`, {
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
      <h2>Lead Management</h2>
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
              <th>C-Name</th>
              <th>Com-Name</th>
              <th>Mobile</th>
              <th>City</th>
              <th>Assigned User</th>
              <th>Status</th>
              <th>Branch</th>
              <th>Branch Head</th>
              <th>Executive</th>
              <th>Created</th>
              <th>Priority</th>



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
                    {item.isActive
                      ? "Deactivate"
                      : "Activate"}
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

                <td>{item.companyName ?? "-"}</td>

                <td>{item.contactPerson ?? "-"}</td>

                <td>{item.mobile ?? "-"}</td>

                <td>{item.city ?? "-"}</td>

                <td>
                  {item.assignedUser?.username ?? "-"}
                </td>

                <td>
                  {item.status?.name ?? "-"}
                </td>

                <td>
                  {item.assignBranch?.branchName ?? "-"}
                </td>

                <td>
                  {item.assignBranchHead?.username ?? "-"}
                </td>

                <td>
                  {item.assignedExecutive?.username ?? "-"}
                </td>

                <td>
                  {item.updatedAt?.substring(0, 10) ?? "-"}
                </td>

                <td>
                  {item.priority ?? "-"}
                </td>


                {/* <td>{item._id ?? "-"}</td> */}



              </tr>
            ))}
          </tbody>

        </table>
      </div>
    ) : (
      <div className="lead-no-data">

        <div className="lead-no-data-icon">
          📋
        </div>

        <h3>No Leads Found</h3>

        <p>
          No lead data available at the moment.
        </p>

      </div>
    )}
{showViewModal && viewLead && (
  <div className="leadview-overlay">
    <div className="leadview-modal">

      <div className="leadview-header">
        <h2>Lead Details</h2>

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
              <span>{viewLead?.contactPerson || "N/A"}</span>
            </div>

            <div>
              <strong>Company</strong>
              <span>{viewLead?.companyName || "N/A"}</span>
            </div>

            <div>
              <strong>Mobile</strong>
              <span>{viewLead?.mobile || "N/A"}</span>
            </div>

            <div>
              <strong>Email</strong>
              <span>{viewLead?.emailId || "N/A"}</span>
            </div>

            <div>
              <strong>Address</strong>
              <span>{viewLead?.address || "N/A"}</span>
            </div>

          </div>
        </div>


        {/* Lead Information */}
        <div className="leadview-card">
          <h3>Lead Information</h3>

          <div className="leadview-grid">

            <div>
              <strong>Status</strong>
              <span>
                {viewLead?.status?.name || "N/A"}
              </span>
            </div>

            <div>
              <strong>Priority</strong>
              <span>
                {viewLead?.priority || "N/A"}
              </span>
            </div>

            <div>
              <strong>Lead Source</strong>
              <span>
                {viewLead?.leadSource?.name || "N/A"}
              </span>
            </div>

            <div>
              <strong>Business</strong>
              <span>
                {viewLead?.businessType?.name || "N/A"}
              </span>
            </div>

            <div>
              <strong>Software</strong>
              <span>
                {viewLead?.Software || "N/A"}
              </span>
            </div>

            <div>
              <strong>Reference</strong>
              <span>
                {viewLead?.referenceDetails || "N/A"}
              </span>
            </div>

            <div>
              <strong>Reason Reject</strong>
              <span>
                {viewLead?.reasonReject || "N/A"}
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
                {viewLead?.assignBranch?.branchName || "N/A"}
              </span>
            </div>

            <div>
              <strong>Branch Head</strong>
              <span>
                {viewLead?.assignBranchHead?.username || "N/A"}
              </span>
            </div>

            <div>
              <strong>Executive</strong>
              <span>
                {viewLead?.assignedExecutive?.username || "N/A"}
              </span>
            </div>

            <div>
              <strong>Assigned User</strong>
              <span>
                {viewLead?.assignedUser?.username || "N/A"}
              </span>
            </div>

          </div>
        </div>


        {/* Date Details */}
        <div className="leadview-card">
          <h3>Date Details</h3>

          <div className="leadview-grid">

            <div>
              <strong>Demo Date</strong>
              <span>
                {viewLead?.demoDate
                  ? viewLead.demoDate.substring(0, 10)
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
            {viewLead?.remarks || "N/A"}
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
export default LeadManagement