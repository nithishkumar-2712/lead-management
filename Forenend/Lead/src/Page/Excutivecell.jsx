import React, { useState } from "react";
import "./Creatstatus.css";
import "./LeadManagement.css";
import Customhook from "../components/Customhook";
import axios from "../Config/axios";
import Swal from "sweetalert2";
function Excutivecell() {
    const {
        Data: Leadget,
        Loading: LeadLoading,
        CustomHook
    } = Customhook("/api/Allservicecells");
    // console.log(Leadget);
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
  return (
    <>
        <div className="table-header body">
          <h2>Excutive Management</h2>
        </div>
        <div className="table-container ">

          <table className="crud-table">

            <thead>
              <tr>
                <th>S.No</th>
                <th>Customer ID</th>
                <th>ContactPerson</th>
                <th>ContactNo</th>
                <th>Assigned Branch</th>
                <th>Assigned User</th>
                <th>Inward</th>
                <th>Service</th>
                <th>cellstatus</th>
                <th>EngineerRemarks</th>
                {/* <th>InstalBy</th>
                <th>Priority</th>
                <th>priority</th>
                <th>Status</th>
                <th>Status</th>
                <th>Delete</th> */}
                <th>Vewi</th>
              </tr>
            </thead>

            <tbody>
            {Leadget.map((item, index) => (
                <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item._id ?? "-"}</td>
                <td>{item.ContactPerson ?? "-"}</td>
                <td>{item.ContactNo ?? "-"}</td>
                {/* <td>{item.installationDate ?.substring(0, 10) ?? "-"}</td> */}
                <td>{item.Branch?.branchName ?? "-"}-{item.assignBranchHead?.Zone?? "-"}</td>
                <td>{item.AssiginedTo.username?? "-"}</td>
                <td>{item.Inward?? "-"}</td>
                <td>{item.Service ?? "-"}</td>
                <td>{item.cellstatus?? "-"}</td>
                <td>{item.EngineerRemarks ?? "-"}-{item.assignBranchHead?.Zone?? "-"}</td>
                <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEview(item)}
                    >
                      view
                    </button>
                </td>
                </tr>
            ))}

            </tbody>

          </table>
        </div>
{showViewModal && viewLead && (
  <div className="leadview-overlay">
    <div className="leadview-modal">

      <div className="leadview-header">
        <h2>Excutive Cells  Details</h2>

        <button
          className="leadview-close-btn"
          onClick={() => setShowViewModal(false)}
        >
          ✕
        </button>
      </div>

      <div className="leadview-body">

        <div className="leadview-card">
          <h3>Customer Details</h3>

          <div className="leadview-grid">
            <div><strong>Customer ID</strong><span>{viewLead._id}</span></div>
            <div><strong>Contact Person</strong><span>{viewLead.ContactPerson}</span></div>
            <div><strong>Company</strong><span>{viewLead.LeadId.companyName}</span></div>
            {/* <div><strong>Mobile</strong><span>{viewLead.leadId.mobile}</span></div>
            <div><strong>Alternate No</strong><span>{viewLead.leadId.licenseId}</span></div> */}
            {/* <div><strong>Email</strong><span>{viewLead.leadId.emailId}</span></div>
            <div><strong>Address</strong><span>{viewLead.leadId.address}</span></div> */}
          </div>
        </div>

        <div className="leadview-card">
          <h3>Insulation Information</h3>

          <div className="leadview-grid">
            <div><strong>license_Id</strong><span>{viewLead.cellstatus}</span></div>
            <div><strong>Software</strong><span>{viewLead.Service}</span></div>
            {/* <div><strong>Status</strong><span>{viewLead.leadId.status?.name}</span></div>
            <div><strong>Priority</strong><span>{viewLead.leadId.priority}</span></div> */}
            {/* <div><strong>Lead Source</strong><span>{viewLead.leadId.softwareName?.name}</span></div> */}
            {/* <div><strong>Language</strong><span>{viewLead.leadId.preferredLanguage}</span></div>
            <div><strong>Reference</strong><span>{viewLead.leadId.city}</span></div>
            <div><strong>Reason Reject</strong><span>{viewLead.leadId.referenceDetails}</span></div> */}
          </div>
        </div>

        <div className="leadview-card">
          <h3>Assignment Details</h3>

          <div className="leadview-grid">
            {/* <div><strong>Branch</strong><span>{viewLead.leadId.assignBranch?.branchName}</span></div>
            <div><strong>Branch Head</strong><span>{viewLead.leadId.assignBranchHead?.username}</span></div>
            <div><strong>Executive</strong><span>{viewLead.leadId.assignedExecutive?.username}</span></div>
            <div><strong>Assigned User</strong><span>{viewLead.leadId.assignedUser?.username}</span></div> */}
          </div>
        </div>

        <div className="leadview-card">
          <h3>Date Details</h3>

          <div className="leadview-grid">
            <div><strong>Demo Date</strong><span>{viewLead.Inward?.substring(0,10)}</span></div>
            {/* <div><strong>Call Later</strong><span>{viewLead.ContactNo?.substring(0,10)}</span></div> */}
            <div><strong>Created</strong><span>{viewLead.createdAt?.substring(0,10)}</span></div>
            <div><strong>Updated</strong><span>{viewLead.updatedAt?.substring(0,10)}</span></div>
          </div>
        </div>

        <div className="leadview-card">
          <h3>Remarks</h3>

          <div className="leadview-remarks">
            {viewLead.EngineerRemarks}
          </div>
        </div>

      </div>

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
export default Excutivecell