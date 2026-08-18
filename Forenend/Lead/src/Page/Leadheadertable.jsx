import React, { useEffect,useState } from "react";
import $ from "jquery";
import "datatables.net-dt";
import { FaEye, FaEdit } from "react-icons/fa";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "./Leadheadertable.css";
import { useNavigate } from "react-router-dom";
import axios from "../Config/axios";
import Customhook from "../components/Customhook";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
// import { useNavigate } from "react-router-dom";

const Leadheadertable = ({ data }) => {
    const navigate = useNavigate();
    // console.log(data)
const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
} = useForm();
  const {
     Data:executives,
    Loading: executivesLoading,
    // CustomHook,
  }=Customhook("/executives")
  const {
    Data: Leadstatus,
    Loading: statusLoading,
    CustomHook,
  } = Customhook("/api/leadstatusget");
//   console.log(Leadstatus)
//   console.log(`excutive user${executives}`);
//   const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
};
    const handleView = (item) => {
    // console.log("View", item);
    navigate(`/LeadView/${item._id}`, {
      state: item,
    });
    };

const handleUpdateEdit = (lead) => {
    setEditLead(lead);
    setShowAssignModal(false);
    setOpenModal(true);
};

const handleAssignEdit = (lead) => {
    setEditLead(lead);
    setOpenModal(false);
    setShowAssignModal(true);
};

const handleAssign = async (formData) => {
    try {
        setIsAssigning(false);
        const assignedExecutive =
            formData.assignedExecutive === "null"
                ? null
                : formData.assignedExecutive;

        const { data } = await axios.put(
            `/api/assign-executive/${editLead._id}`,
            {
                assignedExecutive,
            }
        );

        if (data.success) {
            setShowAssignModal(false);

            await Swal.fire({
                icon: "success",
                title: "Assigned Successfully",
                text: data.message,
                confirmButtonColor: "#2563EB",
                timer: 2000,
                showConfirmButton: false,
            });

            reset();
            window.location.reload();

        } else {
            Swal.fire({
                icon: "warning",
                title: "Assignment Failed",
                text: data.message,
                confirmButtonColor: "#F59E0B",
            });
        }

    } catch (error) {

        Swal.fire({
            icon: "error",
            title: "Something Went Wrong",
            text:
                error.response?.data?.message ||
                "Unable to assign executive.",
            confirmButtonColor: "#DC2626",
        });
    }finally {
    setIsAssigning(false);
  }
};

const handleUpdateLead = async (formData) => {
//   console.log(formData);

  try {
    setIsUpdating(true);
    const { data } = await axios.put(
      `/api/update-lead/${editLead._id}`,
      formData
    );

    if (data.success) {
     setOpenModal(false);
      await Swal.fire({
        icon: "success",
        title: "Lead Updated",
        text: data.message,
        confirmButtonColor: "#2563EB",
        timer: 2000,
        showConfirmButton: false,
      });

  
      reset();
      CustomHook();

      // If needed
      window.location.reload();

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
      text:
        error.response?.data?.message ||
        "Something went wrong",
      confirmButtonColor: "#DC2626",
    });

  }finally {
    setIsUpdating(false);
  }
};
  useEffect(() => {
CustomHook();
  }, [data]);
const selectedStatus = watch("status");

const statusName =
Leadstatus?.find((item) => item._id === selectedStatus)?.name || "";

const SuccessStatus = statusName === "Success";

  return (
    <>
        <div className="">
        <div className="">
            <div className="card-body">
            <div className="table-wrapper">
                <table id="leadTable" className="display">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Veiw</th>
                    <th>Action</th>
                    <th>C-Name</th>
                    <th>Ph:no</th>
                    <th>Business</th>
                    <th>District</th>
                    <th>C-Person</th>
                    <th>status</th>
                    <th>Creat_date</th>
                    <th>Ass-User</th>
                    </tr>
                </thead>

                    <tbody>
                    {data?.map((item, index) => (
                        <React.Fragment key={item._id}>
                        <tr key={item._id}>    
                            <td>{index + 1}</td>
                            <td>

                                <button
                                className="expand-btn"
                                onClick={()=>toggleRow(item._id)}
                                >

                                {expandedRow===item._id ? "▲" : "▼"}

                                </button>

                            </td>
                            <td>
                                <div className="action-bbuttons">

                                    {/* First Edit */}
                                    {item.status?.name !== "Success" &&
                                    !(item.status?.name === "Demo" && item.assignedExecutive?._id) && (
                                        <button
                                            className="edit-bbtn"
                                            onClick={() => handleUpdateEdit(item)}
                                        >
                                            <FaEdit />
                                        </button>
                                    )}

                                    {/* View - Always Show */}
                                    <button
                                        className="view-bbtn"
                                        onClick={() => handleView(item)}
                                    >
                                        <FaEye />
                                    </button>

                                    {/* Second Edit */}
                                    {item.status?.name !== "Success" && (
                                        <button
                                            className="edit-bbtn"
                                            onClick={() => handleAssignEdit(item)}
                                        >
                                            <FaEdit />
                                        </button>
                                    )}

                                </div>
                            </td>

                            <td>{item.companyName}</td>
                            <td>{item.mobile}</td>
                            <td>{item.businessType?.name}</td>
                            <td>{item.district}</td>
                            <td>{item.contactPerson}</td>
                            <td>{item.status?.name}</td>
                            <td>{item.createdAt?.substring(0, 10)}</td>
                            <td>{item.assignedUser.username}</td>
                        </tr>
                            {expandedRow === item._id && (
                            <tr className="details-row">
                                <td colSpan="11">
                                <div className="lead-details">

                                    {item._id && (
                                    <p>
                                        <b>Lead Id :</b> {item._id}
                                    </p>
                                    )}

                                    {item.createdAt && (
                                    <p>
                                        <b>Creat Date:</b> {item.createdAt.substring(0,10)}
                                    </p>
                                    )}

                                    {item.companyName && (
                                    <p>
                                        <b>Company Name :</b> {item.companyName}
                                    </p>
                                    )}
                                    {item.contactNo && (
                                    <p>
                                        <b>ContactNo :</b> {item.contactNo}
                                    </p>
                                    )}

                                    {item.leadSource?.name && (
                                    <p>
                                        <b>Lead Source :</b> {item.leadSource.name}
                                    </p>
                                    )}

                                    {item.assignedUser?.username && (
                                    <p>
                                        <b>Tele Caller :</b> {item.assignedUser.username}
                                    </p>
                                    )}

                                    {item.assignBranchHead?.username && (
                                    <p>
                                        <b>Branch Head :</b> {item.assignBranchHead.username}
                                    </p>
                                    )}

                                    {item.assignedExecutive?.username && (
                                    <p>
                                        <b>Executive :</b> {item.assignedExecutive.username}
                                    </p>
                                    )}

                                    {item.priority && (
                                    <p>
                                        <b>Priority :</b> {item.priority}
                                    </p>
                                    )}

                                    {item.remarks && (
                                    <p>
                                        <b>Remarks :</b> {item.remarks}
                                    </p>
                                    )}

                                    {item.assignBranch?.branchName && (
                                    <p>
                                        <b>Branch :</b> {item.assignBranch.branchName}
                                    </p>
                                    )}

                                    {item.city && (
                                    <p>
                                        <b>City :</b> {item.city}
                                    </p>
                                    )}
                                    {item.district && (
                                    <p>
                                        <b>District :</b> {item.district}
                                    </p>
                                    )}

                                    {item.businessType?.name && (
                                    <p>
                                        <b>Business :</b> {item.businessType.name}
                                    </p>
                                    )}

                                    {item.demoDate && (
                                    <p>
                                        <b>Demo Date :</b> {item.demoDate.substring(0, 10)}
                                    </p>
                                    )}

                                </div>
                                </td>
                            </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
        {openModal && (
            <div className="modal-overrlay">
                <div className="modall-boox">
                    <h2>Update Lead Details</h2>
                    <form className="formstatusupddate" onSubmit={handleSubmit(handleUpdateLead)}>
                    <div className="form-groupp">
                        <label>Lead Id</label>
                        <input
                            type="text"
                              {...register("_id")}
                                value={editLead?._id}
                                readOnly
                         />
                    </div>

                    <div className="form-groupp">
                        <label>Company Name</label>
                        <input
                            type="text"
                            value={editLead?.companyName}
                            readOnly
                        />
                    </div>

                    <div className="form-groupp">
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
                    <div className="form-groupp">
                        <label>Remarks</label>
                        <textarea
                         rows="4"
                            {...register("remarks", {
                            required: "Remarks Required",
                            })}
                        />
                    </div>

                    {SuccessStatus && (
                    <div className="success-details-box">

                        <div className="success-details-title">
                        <span>✓</span>
                        <div>
                            <h3>Success Lead Details</h3>
                            <p>Please enter the license information</p>
                        </div>
                        </div>

                        <div className="success-details-grid">

                        {/* License ID */}
                        <div className="form-groupp success-field">
                            <label>
                            License ID <span>*</span>
                            </label>

                            <input
                            type="text"
                            {...register("license", {
                                required: SuccessStatus
                                ? "License ID is required"
                                : false,
                            })}
                            placeholder="Enter License ID"
                            />

                            <small className="error">
                            {errors.license?.message}
                            </small>
                        </div>


                        {/* Software Name */}
                        <div className="form-groupp success-field">
                            <label>
                            Software Name <span>*</span>
                            </label>

                            <input
                            type="text"
                            {...register("softwareName", {
                                required: SuccessStatus
                                ? "Software Name is required"
                                : false,
                            })}
                            placeholder="Enter Software Name"
                            />

                            <small className="error">
                            {errors.softwareName?.message}
                            </small>
                        </div>


                        {/* Installation Date */}
                        <div className="form-groupp success-field">
                            <label>
                            Installation Date <span>*</span>
                            </label>

                            <input
                            type="date"
                            {...register("installationDate", {
                                required: SuccessStatus
                                ? "Installation Date is required"
                                : false,
                            })}
                            />

                            <small className="error">
                            {errors.installationDate?.message}
                            </small>
                        </div>
                        {/* Address */}
                        <div className="form-group">
                            <label>Address</label>
                            <textarea
                            rows="8"
                            placeholder="Enter Address"
                            {...register("address")}
                            />
                        </div>

                        </div>
                    </div>
                    )}
                    
                    <div className="modal-buttoons">
                        <button
                            className="cancel-btnnn"
                            onClick={() => setOpenModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                        type="submit"
                        className="update-btnnn"
                        disabled={isUpdating}
                        >
                        {isUpdating ? (
                            <>
                            <span className="button-spinner"></span>
                            Updating...
                            </>
                        ) : (
                            "Update"
                        )}
                        </button>
                    </div>
                    </form>

                </div>
            </div>
        )}

        {showAssignModal && (
            <div className="assign-modal-overlayyy">
                <div className="assign-modaall">

                <div className="assign-header">
                    <h2>Assign Executive</h2>

                    <button
                    className="close-btnnnn"
                    onClick={() => setShowAssignModal(false)}
                    >
                    &times;
                    </button>
                </div>

                <form className="excutive-model" onSubmit={handleSubmit(handleAssign)}>

                    <div className="assign-body">

                        <label>Select Executive</label>

                        <select
                            {...register("assignedExecutive", {
                                required: true,
                            })}
                        >
                            <option value="">Select Executive</option>
                            <option value="null">My</option>

                            {executives.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.username}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="assign-foooter">

                        <button
                            type="button"
                            className="cancel-btnnnn"
                            onClick={() => setShowAssignModal(false)}
                        >
                            Cancel
                        </button>

                        <button
                        type="submit"
                        className="assign-btnnnn"
                        disabled={isAssigning}
                        >
                        {isAssigning ? (
                            <>
                            <span className="button-spinner"></span>
                            Assigning...
                            </>
                        ) : (
                            "Assign"
                        )}
                        </button>

                    </div>

                </form>

                </div>
            </div>
        )}
    
    </>
  );
};

export default Leadheadertable;