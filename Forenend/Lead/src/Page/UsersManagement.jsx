import React, { useState } from 'react'
import "./UsersManagement.css"
import Swal from "sweetalert2";
import axios from "../Config/axios";
import Customhook from "../components/Customhook";
import {useNavigate } from "react-router-dom";
function UsersManagement() {
  // const { Data, CustomHook, Loading, Error } = ("/getUser");
  const navigate = useNavigate();  
  const {
    Data: Userdata,
    Loading: UserLoading,
    CustomHook
  } = Customhook("/api/Fetchuser");
  const [selectedUser, setSelectedUser] = useState(null);
  // console.log(selectedUser);
  const [showModal, setShowModal] = useState(false);

  const handleUpdate = async (id, isBlocked) => {
    // console.log(id, isBlocked);
    const result = await Swal.fire({
      title: isBlocked ? "Unblock User?" : "Block User?",
      text: isBlocked
      ? "Are you sure you want to block this user?"
      : "Are you sure you want to unblock this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: isBlocked ? "Yes, Unblock" : "Yes, Block",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const { data } = await axios.put(`/api/blockUser/${id}`, {
        isBlocked: !isBlocked,
      });

      if (data.success) {
        await Swal.fire({
          title: "Success!",
          text: data.message,
          icon: "success",
        });

        CustomHook();
      } else {
        Swal.fire({
          title: "Warning!",
          text: data.message,
          icon: "warning",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  const handleView = (user) => {
    // console.log("Selected User:", user); // 🔥 log
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };
  if (UserLoading) {
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

  /* =========================
     ERROR DESIGN
  ========================= */

  // if (Error) {
  //   return (
  //     <div className="users-page">

  //       <div className="error-box">

  //         <h2>⚠ Failed to Load Users</h2>

  //         <p>Please check server connection...</p>

  //         <button onClick={() => window.location.reload()}>
  //           Retry
  //         </button>

  //       </div>

  //     </div>
  //   );
  // }
  return (
    <>
      <div className='body'>
        <div className="users-page">

          <div className="users-header">
            <h2 className='h2'>UsersManagement</h2>
            <button className="view-btn" onClick={() => navigate("/signup")}>User Creat</button>
          </div>

          <table className="users-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Avatar</th>
                <th>Name</th>
                {/* <th>Email</th> */}
                <th>Role</th>
                <th>Branch</th>
                {/* <th>Zone</th> */}
                {/* <th>Number</th> */}
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {Userdata.map((items, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      className="user-img"
                    />
                  </td>
                  <td>{items.username}</td>
                  {/* <td>{items.Email}</td> */}
                  <td>{items.userType.roleName}</td>
                  <td>{items.branch.branchName}</td>
                  {/* <td>{items.Zone}</td> */}
                  {/* <td>{items.Number}</td> */}
                  <td><span className={items.isBlocked?"active":"inactive"}>{items.isBlocked?"Active":"inActive"}</span></td>
                  <td>
                    <button className="view-btn" onClick={() => handleView(items)}>View</button>
                    <button
                      className="block-btn"
                      onClick={() => handleUpdate(items._id, items.isBlocked)}
                    >
                      {items.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= MODAL ================= */}
        {showModal && selectedUser && (
          <div className="modal-overlay">
            <div className="user-modal">

              <div className="modal-header">
                <h3>User Details</h3>
                <button className="close" onClick={closeModal}>✖</button>
              </div>

              <div className="modal-body">

                <p><b>Username:</b> {selectedUser.Username || "nithish"}</p>
                <p><b>branch:</b> {selectedUser.branch.branchName}</p>
                <p><b>userType:</b> {selectedUser.userType.roleName}</p>
                {/* <p><b>Zone:</b> {selectedUser.Zone}</p> */}
                <p><b>Number:</b> {selectedUser.Number || "1234567890"}</p>
                <p><b>Status:</b> {selectedUser.isBlocked?"Active":"inActive"}</p>
                <p><b>Email:</b> {selectedUser.Email}</p>

              </div>

            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default UsersManagement;