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
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Leadexcutivetable = ({ data,onLeadUpdated }) => {
    const navigate = useNavigate();
    // console.log(data)
    const hasValue = (value) => {
        if (value === null || value === undefined) return false;

        const text = String(value).trim().toLowerCase();

        return text !== "" && text !== "n/a" && text !== "na";
    };

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
  }=Customhook("/executives")
  const {
    Data: Leadstatus,
    Loading: statusLoading,
  } = Customhook("/api/leadstatusget");
//   console.log(Leadstatus)
//   console.log(`excutive user${executives}`);
//   const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
//   const [executives, setExecutives] = useState([]);
const [expandedRow, setExpandedRow] = useState(null);

const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
};

  // ===================== VIEW =====================
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

const handleUpdateLead = async (formData) => {
//   console.log(formData);

  try {
     setIsUpdating(true);
    const { data } = await axios.put(
      `/api/update-lead/${editLead._id}`,
      formData
    );
    reset();
    if (data.success) {
       setOpenModal(false);
      await Swal.fire({
        icon: "success",
        title: "Lead Updated Successfully",
        text: data.message,
        confirmButtonColor: "#2563EB",
        timer: 2000,
        showConfirmButton: false,
      });
 
        if (onLeadUpdated) {
            await onLeadUpdated();
        }


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

  }, [data]);
const selectedStatus = watch("status");

const statusName =
Leadstatus?.find((item) => item._id === selectedStatus)?.name || "";

const SuccessStatus = statusName === "Success";

// const isRescheduled = statusName === "Rescheduled";

// const isCallLater = statusName === "Call Later";

// const isBusy = statusName === "Busy / Call Later";

// const isMoreDemo = statusName === "More Demo";

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
                    <th>Business</th>
                    <th>C:Name</th>
                    <th>Ph:no</th>
                    <th>City</th>
                    <th>Tele Call</th>
                    <th>status</th>
                    <th>Lead Id</th>
                    </tr>
                </thead>

                <tbody>

                {data.map((item,index)=>(

                <React.Fragment key={item._id}>

                <tr>
                    <td>{index+1}</td>

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
                            {item.status?.name !== "Success" && (
                                <button
                                            className="edit-bbtn"
                                            onClick={() => handleUpdateEdit(item)}
                                        >
                                            <FaEdit />
                                </button>
                            )}

                            <button
                                className="view-bbtn"
                                onClick={() => handleView(item)}
                            >
                                <FaEye />
                            </button>

                        </div>
                    </td>

                    <td>{item.businessType?.name}</td>
                    <td>{item.companyName}</td>
                    <td>{item.mobile}</td>
                    <td>{item.district}</td>
                    <td>{item.assignedUser?.username}</td>
                    <td>{item.status.name}</td>
                    <td>{item._id}</td>

                </tr>

                {expandedRow === item._id && (
                <tr className="details-row">
                    <td colSpan="10">
                    <div className="lead-details">

                        {hasValue(item._id) && (
                        <p>
                            <b>Lead Id :</b> {item._id}
                        </p>
                        )}

                        {hasValue(item.leadSource?.name) && (
                        <p>
                            <b>Lead Source :</b> {item.leadSource.name}
                        </p>
                        )}

                        {hasValue(item.assignedUser?.username) && (
                        <p>
                            <b>Tele Caller :</b> {item.assignedUser.username}
                        </p>
                        )}

                        {hasValue(item.preferredLanguage) && (
                        <p>
                            <b>Language :</b> {item.preferredLanguage}
                        </p>
                        )}

                        {hasValue(item.priority) && (
                        <p>
                            <b>Priority :</b> {item.priority}
                        </p>
                        )}

                        {hasValue(item.remarks) && (
                        <p>
                            <b>Remarks :</b> {item.remarks}
                        </p>
                        )}

                        {hasValue(item.assignBranch?.branchName) && (
                        <p>
                            <b>Branch :</b> {item.assignBranch.branchName}
                        </p>
                        )}

                        {hasValue(item.assignBranchHead?.username) && (
                        <p>
                            <b>Branch Head :</b> {item.assignBranchHead.username}
                        </p>
                        )}

                        {hasValue(item.assignedExecutive?.username) && (
                        <p>
                            <b>Executive :</b> {item.assignedExecutive.username}
                        </p>
                        )}

                        {hasValue(item.businessType?.name) && (
                        <p>
                            <b>Business :</b> {item.businessType.name}
                        </p>
                        )}

                        {hasValue(item.demoDate) && (
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

    </>
  );
};

export default Leadexcutivetable;