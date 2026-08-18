import React, { useState } from "react";
import "./Creatstatus.css";
import Customhook from "../components/Customhook";
import axios from "../Config/axios";
import Swal from "sweetalert2";
function Creatstatus() {
  const {
    Data: Leadstatus,
    Loading: statusLoading,
    CustomHook
  } = Customhook("/api/leadstatusget");
  // console.log(Leadstatus);
const [showAddModal, setShowAddModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);

  const [newRole, setNewRole] = useState({
    name: "",
  });

  const [editData, setEditData] = useState({
    _id: "",
    name: "",
  });

const handleEdit = (item) => {
  setEditData({
    _id: item._id,
    name: item.name,
  });

  setShowEditModal(true);
};

const handleUpdate = async () => {
  try {
    const { data } = await axios.put(
      `/api/leadstatusupdate/${editData._id}`,
      {
        name: editData.name,
      }
    );

    if (data.success) {

      await Swal.fire({
        icon: "success",
        title: "Status Updated",
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
      ? "Activate Status?"
      : "Deactivate Status?",
    text: isDeleted
      ? "Do you want to activate this status?"
      : "Do you want to deactivate this status?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#2563EB",
    cancelButtonColor: "#DC2626",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {

    const { data } = await axios.put(`/api/leadstatusdelete/${id}`, {
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

    if (!newRole.name.trim()) {

      Swal.fire({
        icon: "warning",
        title: "Validation",
        text: "Please Enter Status Name",
        confirmButtonColor: "#F59E0B",
      });

      return;
    }

    const { data } = await axios.post("/api/leadstatuscreat", {
      name: newRole.name,
    });

    if (data.success) {

      await Swal.fire({
        icon: "success",
        title: "Status Created",
        text: data.message,
        confirmButtonColor: "#2563EB",
        timer: 2000,
        showConfirmButton: false,
      });

      setShowAddModal(false);

      setNewRole({
        name: "",
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
if (statusLoading) {
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
          <h2>Status Management</h2>

          <button
            className="add-btn"
            onClick={() => {
                setShowAddModal(true);
            }}
          >
            + Add Status
          </button>
        </div>
{Leadstatus && Leadstatus.length > 0 ? (
  <div className="table-container">

    <table className="crud-table">

      <thead>
        <tr>
          <th>S.No</th>
          <th>Status Name</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {Leadstatus.map((item, index) => (
          <tr key={item._id}>

            <td>{index + 1}</td>

            <td>{item.name ?? "-"}</td>

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

    <h3>No Status Found</h3>

    <p>
      There are no Status available.
    </p>

  </div>
)}

        {showEditModal && (
          <div className="modal">
            <div className="modal-content">

              <h2>Edit Status Role</h2>

              <input
                type="text"
                placeholder="Enter Status Role"
                value={editData.name}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    name: e.target.value,
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

              <h2>Add Status Role</h2>

              <input
                type="text"
                placeholder="Enter Status Role"
                value={newRole.name}
                onChange={(e) =>
                  setNewRole({
                    ...newRole,
                    name: e.target.value,
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

export default Creatstatus;