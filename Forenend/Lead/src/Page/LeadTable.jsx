import React, { useEffect,useState } from "react";
import $ from "jquery";
import "datatables.net-dt";
import { FaEye, FaEdit } from "react-icons/fa";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "./LeadTable.css";
import { useNavigate} from "react-router-dom";

const LeadTable = ({ data }) => {
  // console.log(data)
  const hasValue = (value) => {
  if (value === null || value === undefined) return false;

  const text = String(value).trim().toLowerCase();

  return text !== "" && text !== "n/a" && text !== "na";
};
  const navigate = useNavigate();
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

  // ===================== EDIT =====================
  const handleEdit = (item) => {
    // console.log("Edit", item);


    if (item.assignBranch?._id) {
      return;
    }


    if (item.status?.name === "Demo") {
      navigate(`/LeadUpdate/${item._id}`,{
        state:{
        leadData: item,
      }
    });
    }

    else {
      navigate(`/LeadFormUpdate/${item._id}`, {
        state: item,
      });
    }
  };

  useEffect(() => {
    // if ($.fn.DataTable.isDataTable("#leadTable")) {
    //   $("#leadTable").DataTable().destroy();
    // }

    // $("#leadTable").DataTable({
    //   pageLength: 5,
    //   lengthMenu: [5, 10, 25, 50],
    //   searching: true,
    //   ordering: true,
    //   responsive: true,
    // });
  }, [data]);

  return (
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
                  <th>Tele Caller</th>
                  <th>Lead Source</th>
                  <th>Mobile</th>
                  <th>Lead Date</th>
                  {/* <th>Language</th> */}
                  <th>priority</th>
                  <th>Status</th>
                  <th>Remarks</th>
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
                          <button
                            className="view-bbtn"
                            onClick={() => handleView(item)}
                          >
                            <FaEye />
                          </button>

                          {!item.assignBranch?._id && (
                            <button
                              className="edit-bbtn"
                              onClick={() => handleEdit(item)}
                            >
                              <FaEdit />
                            </button>
                          )}
                        </div>
                      </td>
                      <td>{item.assignedUser.username}</td>
                      <td>{item.leadSource?.name}</td>
                      <td>{item.mobile}</td>
                      <td>{item.createdAt?.substring(0, 10)}</td>
                      {/* <td>{item.preferredLanguage}</td> */}
                      <td>{item.priority}</td>
                      {/* <td>{item.reasonReject}</td> */}
                      <td>{item.status?.name}</td>
                      <td>{item.remarks}</td>
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

                            {hasValue(item.createdAt) && (
                              <p>
                                <b>Created Date :</b> {item.createdAt.substring(0, 10)}
                              </p>
                            )}

                            {hasValue(item.assignedUser?.username) && (
                              <p>
                                <b>Tele Caller :</b> {item.assignedUser.username}
                              </p>
                            )}

                            {hasValue(item.mobile) && (
                              <p>
                                <b>Mobile :</b> {item.mobile}
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

                            {hasValue(item.contactPerson) && (
                              <p>
                                <b>Person :</b> {item.contactPerson}
                              </p>
                            )}

                            {hasValue(item.companyName) && (
                              <p>
                                <b>Company Name :</b> {item.companyName}
                              </p>
                            )}

                            {hasValue(item.businessType?.name) && (
                              <p>
                                <b>Business :</b> {item.businessType.name}
                              </p>
                            )}

                            {hasValue(item.district) && (
                              <p>
                                <b>District :</b> {item.district}
                              </p>
                            )}

                            {hasValue(item.city) && (
                              <p>
                                <b>City :</b> {item.city}
                              </p>
                            )}

                            {hasValue(item.contactNo) && (
                              <p>
                                <b>Contact Number :</b> {item.contactNo}
                              </p>
                            )}

                            {hasValue(item.emailId) && (
                              <p>
                                <b>Email :</b> {item.emailId}
                              </p>
                            )}

                            {hasValue(item.software) && (
                              <p>
                                <b>Software :</b> {item.software}
                              </p>
                            )}

                            {hasValue(item.referenceDetails) && (
                              <p>
                                <b>Reference Details :</b> {item.referenceDetails}
                              </p>
                            )}

                            {hasValue(item.status?.name) && (
                              <p>
                                <b>Status :</b> {item.status.name}
                              </p>
                            )}

                            {hasValue(item.demoDate) && (
                              <p>
                                <b>Demo Date :</b> {item.demoDate.substring(0, 10)}
                              </p>
                            )}

                            {hasValue(item.nextDemoDate) && (
                              <p>
                                <b>Next Demo Date :</b> {item.nextDemoDate.substring(0, 10)}
                              </p>
                            )}

                            {hasValue(item.rescheduledDate) && (
                              <p>
                                <b>Rescheduled Date :</b> {item.rescheduledDate.substring(0, 10)}
                              </p>
                            )}

                            {hasValue(item.demoRemarks) && (
                              <p>
                                <b>Demo Remarks :</b> {item.demoRemarks}
                              </p>
                            )}

                            {hasValue(item.reasonReject) && (
                              <p>
                                <b>Reason Reject :</b> {item.reasonReject}
                              </p>
                            )}

                            {hasValue(item.address) && (
                              <p>
                                <b>Address :</b> {item.address}
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
  );
};

export default LeadTable;