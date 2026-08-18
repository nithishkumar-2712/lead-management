import React, { useState } from "react";
import "./Creatstatus.css";
import Customhook from "../components/Customhook";
import axios from "../Config/axios";
import Swal from "sweetalert2";
function Leadsourse() {
  const {
    Data: LeadSourse,
    Loading: SourseLoading,
    CustomHook
  } = Customhook("/api/Leadsourceget");
  // console.log(LeadSourse);
const [showAddModal, setShowAddModal] = useState(false);
const [showEditModal, setShowEditModal] = useState(false);

const [Source, setSource] = useState({
  name: "",
  description: "",
});

const [editData, setEditData] = useState({
  _id: "",
  name: "",
  description: "",
});

const handleEdit = (item) => {
  setEditData({
    _id: item._id,
    name: item.name,
    description: item.description,
  });

  setShowEditModal(true);
};

const handleUpdate = async () => {
  try {
    const { data } = await axios.put(
      `/api/Leadsourceupdate/${editData._id}`,
      {
        name: editData.name,
        description: editData.description,
      }
    );

    if (data.success) {

      await Swal.fire({
        icon: "success",
        title: "Lead Source Updated",
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
      ? "Activate Lead Source?"
      : "Deactivate Lead Source?",
    text: isDeleted
      ? "Do you want to activate this lead source?"
      : "Do you want to deactivate this lead source?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#2563EB",
    cancelButtonColor: "#DC2626",
    confirmButtonText: "Yes",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {

    const { data } = await axios.put(`/api/Leadsourcedelete/${id}`, {
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

    if (!Source.name.trim()) {

      Swal.fire({
        icon: "warning",
        title: "Validation",
        text: "Please Enter Lead Source Name",
        confirmButtonColor: "#F59E0B",
      });

      return;
    }

    const { data } = await axios.post("/api/Leadsourcecreat", {
      name: Source.name,
      description: Source.description,
    });

    if (data.success) {

      await Swal.fire({
        icon: "success",
        title: "Lead Source Created",
        text: data.message,
        confirmButtonColor: "#2563EB",
        timer: 2000,
        showConfirmButton: false,
      });

      setShowAddModal(false);

      setSource({
        name: "",
        description: "",
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
if (SourseLoading) {
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
          <h2>Source Management</h2>

          <button
            className="add-btn"
            onClick={() => {
                setShowAddModal(true);
            }}
          >
            + Add Source
          </button>
        </div>
{LeadSourse && LeadSourse.length > 0 ? (
  <div className="table-container">

    <table className="crud-table">

      <thead>
        <tr>
          <th>S.No</th>
          <th>Source Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {LeadSourse.map((item, index) => (
          <tr key={item._id}>

            <td>{index + 1}</td>

            <td>{item.name ?? "-"}</td>

            <td>{item.description ?? "-"}</td>

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

    <h3>No Source Found</h3>

    <p>
      There are no Source available.
    </p>

  </div>
)}

        {showEditModal && (
          <div className="modal">
            <div className="modal-content">

              <h2>Edit Lead Source</h2>

              <input
                type="text"
                placeholder="Enter Lead Source"
                value={editData.name}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    name: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Enter Lead description"
                value={editData.description}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    description: e.target.value,
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

              <h2>Add Lead Source</h2>

              <input
                type="text"
                placeholder="Enter lead Source"
                value={Source.name}
                onChange={(e) =>
                  setSource({
                    ...Source,
                    name: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Enter Lead description"
                value={Source.description}
                onChange={(e) =>
                  setSource({
                    ...Source,
                    description: e.target.value,
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

export default Leadsourse;