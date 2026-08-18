import React, { useState } from "react";
import "./Creatstatus.css";
import Customhook from "../components/Customhook";
import axios from "../Config/axios";
import Swal from "sweetalert2";
function BranchCreat() {
  const {
    Data: LeadBranch,
    Loading: BranchLoading,
    CustomHook
  } = Customhook("/api/branchesget");
  // console.log(LeadSourse);
const [showAddModal, setShowAddModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);

const [Branch, setBranch] = useState({
  branchName: "",
  address: "",
  phone: "",
});

const [editData, setEditData] = useState({
  _id: "",
  branchName: "",
  address: "",
  phone: "",
});

const handleEdit = (item) => {
  setEditData({
    _id: item._id,
    name: item.name,
    address: item.address,
    phone: item.phone,
  });

  setShowEditModal(true);
};

const handleUpdate = async () => {
  try {
    const { data } = await axios.put(
      `/api/branchesUpdate/${editData._id}`,
      {
        branchName: editData.branchName,
        address: editData.address,
        phone: editData.phone,
      }
    );

    if (data.success) {

      await Swal.fire({
        icon: "success",
        title: "Branch Updated",
        text: data.message,
        confirmButtonColor: "#2563EB",
        timer: 2000,
        showConfirmButton: false,
      });

      setShowEditModal(false);
      CustomHook();

    } else {

      Swal.fire({
        icon: "warning",
        title: "Update Failed",
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


const handleDelete = async (id, isDeleted) => {

  const result = await Swal.fire({
    title: isDeleted
      ? "Activate Branch?"
      : "Deactivate Branch?",
    text: isDeleted
      ? "Do you want to activate this branch?"
      : "Do you want to deactivate this branch?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#2563EB",
    cancelButtonColor: "#DC2626",
  });

  if (!result.isConfirmed) return;

  try {

    const { data } = await axios.put(`/api/branchesdelete/${id}`, {
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
const handleAdd = async () => {

  try {

    if (!Branch.branchName.trim()) {

      Swal.fire({
        icon: "warning",
        title: "Validation",
        text: "Please Enter Branch Name",
        confirmButtonColor: "#F59E0B",
      });

      return;
    }

    const { data } = await axios.post("/api/branchescreate", {
      branchName: Branch.branchName,
      address: Branch.address,
      phone: Branch.phone,
    });

    if (data.success) {
      setShowAddModal(false);
      await Swal.fire({
        icon: "success",
        title: "Branch Created",
        text: data.message,
        confirmButtonColor: "#2563EB",
        timer: 2000,
        showConfirmButton: false,
      });
      setBranch({
        branchName: "",
        address: "",
        phone: "",
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
  if (BranchLoading) {
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
      <div className="body">
        <div className="table-header">
          <h2>Branch Management</h2>

          <button
            className="add-btn"
            onClick={() => {
                setShowAddModal(true);
            }}
          >
            + Add Branch
          </button>
        </div>
{LeadBranch && LeadBranch.length > 0 ? (
  <div className="table-container">

    <table className="crud-table">

      <thead>
        <tr>
          <th>S.No</th>
          <th>Branch Name</th>
          {/* <th>Address</th> */}
          <th>Phone</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {LeadBranch.map((item, index) => (
          <tr key={item._id}>

            <td>{index + 1}</td>

            <td>{item.branchName ?? "-"}</td>

            {/* <td>{item.address ?? "-"}</td> */}

            <td>{item.phone ?? "-"}</td>

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

            <td>
              <button
                className="edit-btn"
                onClick={() => handleEdit(item)}
              >
                Edit
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

    <h3>No Branch Found</h3>

    <p>
      There are no Branch available.
    </p>

  </div>
)}

        {showEditModal && (
          <div className="modal">
            <div className="modal-content">

              <h2>Edit Lead Branch</h2>

              <input
                type="text"
                placeholder="Enter  Branch"
                value={editData.branchName}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    branchName: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Enter Branch Number"
                value={editData.phone}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    phone: e.target.value,
                  })
                }
              />
              <textarea
                type="text"
                placeholder="Enter Branch Address"
                value={editData.address}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    address: e.target.value,
                  })
                }
              />

              <div className="btn-group">
                <button onClick={handleUpdate}>
                  Update
                </button>

                <button onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}
        {showAddModal && (
          <div className="modal">
            <div className="modal-content">

              <h2>Add Branch</h2>
              <input
                type="text"
                placeholder="Enter Branch Name"
                value={Branch.branchName}
                onChange={(e) =>
                  setBranch({
                    ...Branch,
                    branchName: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Enter Branch Number"
                value={Branch.phone}
                onChange={(e) =>
                  setBranch({
                    ...Branch,
                    phone: e.target.value,
                  })
                }
              />
              <textarea
                type="text"
                placeholder="Enter Branch Address"
                value={Branch.address}
                onChange={(e) =>
                  setBranch({
                    ...Branch,
                    address: e.target.value,
                  })
                }
              />

              <div className="btn-group">
                <button onClick={handleAdd}>
                  Save
                </button>

                <button onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BranchCreat;