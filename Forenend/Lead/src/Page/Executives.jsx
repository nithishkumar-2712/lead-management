import React, { useState } from "react";
import "./Executives.css";
import { useMemo } from "react";
import axios from "../Config/axios";
import { useForm } from "react-hook-form";
import Customhook from "../components/Customhook";

function Executives() {
  const [searchData, setSearchData] = useState({
  mobile: "",
  companyName: "",
  licenseId: ""
});
const {register,handleSubmit,reset,  formState: { errors },} = useForm();
  const {
    Data: Branch,
    Loading: BranchLoading,
    CustomHook,
  } = Customhook("/api/branchesget");
  const {
    Data: executives,
    Loading: executivesLoading,
  } = Customhook("/executives");
  const {
  Data: Todaycells,
  Loading: TodayLoading,
} = Customhook("/api/Todaycell");
// console.log(Todaycells);

const {
  Data: counts,
  Loading: countLoading,
} = Customhook("/api/Allservicecells");

const statistics = useMemo(() => {
  if (!Array.isArray(counts)) {
    return {
      totalCalls: 0,
      pendingCalls: 0,
      solvedCalls: 0,
      pendingCustomers: 0,
    };
  }

  const totalCalls = counts.length;

  const pendingCalls = counts.filter(
    (item) => item.cellstatus === "Pending"
  ).length;

  const solvedCalls = counts.filter(
    (item) => item.cellstatus === "Solved"
  ).length;

  // Pending customers (unique ContactNo)
  const pendingCustomers = new Set(
    counts
      .filter((item) => item.cellstatus === "Customer Pending")
      .map((item) => item.ContactNo)
  ).size;

  return {
    totalCalls,
    pendingCalls,
    solvedCalls,
    pendingCustomers,
  };
}, [counts]);

  const [formData, setFormData] = useState([]);
  // console.log(formData);

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSearch = async () => {
  const { mobile, companyName, licenseId } = searchData;

    // At least one field required
    if (!mobile && !companyName && !licenseId ) {
      alert("Please enter at least one search field.");
      return;
    }
    console.log(mobile, companyName, licenseId )
    try {
      const { data } = await axios.post("/api/searchexcutivecell", searchData);
      if(data.success){
        alert(data.message)
        setFormData(data.data)
      }else{
        alert(data.message)
      }
    } catch (error) {
      alert(error.message);
    }
  };


const onServiceSubmit = async (data) => {
    const payload = {
    ...data,
    leadId: formData._id,
    CustomerId: formData.leadId?._id,
    ContactPerson: formData.leadId?.contactPerson,
    ContactNo: formData.mobile,
    // status: formData.leadId?.status?.name,
  };
  console.log(payload)

  try {
    const { data } = await axios.post(
      "/api/servicecells",
      payload
    );

    if (data.success) {
      alert("Saved Successfully");
      
      reset();
      setFormData({});
      setSearchData({
        mobile: "",
        companyName: "",
        licenseId: "",
      });
    

    } else {
      alert(data.message);
    }
  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  }
};

const Service=["Online","My Phone","Direct Visit"]
const Status=["Follow Up","Pending","Cell Backup","Solved","Customer Pending","Tranfer","Data Collotion(Pending)","Visit Assigned","Account Assigned"]
const inward=["Follow Up","Pending","Cell Backup","Solved","Customer Pending","Tranfer","Data Collotion(Pending)","Visit Assigned","Account Assigned"]

  return (
    <>
      <div className="body">
        <div className="dashboardd">
            <div className="cards-excutive">
              <div className="cards pendingg">
                <div>
                  <h3>Pending Calls</h3>
                  <p>Current Pending</p>
                </div>
                <h1> {statistics.pendingCalls}</h1>
              </div>

              <div className="cards customerr">
                <div>
                  <h3>Customer Pending</h3>
                  <p>Waiting Response</p>
                </div>
                <h1> {statistics.pendingCustomers}</h1>
              </div>

              <div className="cards solvedd">
                <div>
                  <h3>Solved Calls</h3>
                  <p>Completed Calls</p>
                </div>
                <h1> {statistics.solvedCalls}</h1>
              </div>

              <div className="cards totall">
                <div>
                  <h3>Total Records</h3>
                  <p>Overall Records</p>
                </div>
                <h1> {statistics.totalCalls}</h1>
              </div>
            </div>
          {/* Search */}
            <div className="search-box">
              <h3>SEARCH</h3>

              <div className="search-grid">
                <input  
                  type="text"
                  name="mobile"
                  placeholder="Mobile No"
                  value={searchData.mobile}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={searchData.companyName}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="licenseId"
                  placeholder="license Id "
                  value={searchData.licenseId}
                  onChange={handleChange}
                />

                <button type="button" onClick={handleSearch}>
                  SEARCH
                </button>
              </div>
            </div>

          {/* License + Form */}

            <form onSubmit={handleSubmit(onServiceSubmit)}>
          <div className="main-section">
            {/* License Details */}

            <div className="license-card">

              <h3>License Details</h3>

              <table>
                <tbody>
                  <tr>
                    <td>Customer Id</td>
                    <td>
                      <input
                        type="text"
                        
                        value={formData?._id || ""}
                        readOnly
                        className="celldetails"
                      />
                    </td>
                    </tr>
                  <tr>
                    <td>Business Name</td>
                    <td>
                      <input
                        type="text"
                        value={formData.leadId?.companyName || ""}
                        readOnly
                        className="celldetails"
                      />
                    </td>
                    </tr>
                  <tr>
                    <td>Address</td>
                    <td>
                      <input
                        type="text"
                        value={formData.leadId?.address || ""}
                        readOnly
                        className="celldetails"
                      />
                    </td>
                    </tr>
                  <tr>
                    <td>Place / City</td>
                    <td>
                      <input
                        type="text"
                        value={formData.leadId?.city || ""}
                        readOnly
                        className="celldetails"
                      />
                    </td>
                    </tr>
                  <tr>
                    <td>Reg Mobile No</td>
                    <td>
                      <input
                        type="text"
                        value={formData.leadId?.mobile || ""}
                        readOnly
                        className="celldetails"
                      />
                    </td>
                    </tr>
                  <tr>
                    <td>Email Id</td>
                    <td>
                      <input
                        type="text"
                        value={formData.leadId?.emailId || ""}
                        readOnly
                        className="celldetails"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Product Name</td>
                    <td>
                      <input
                        type="text"
                        value={formData?.softwareName || ""}
                        readOnly
                        className="celldetails"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Installed Date</td>
                    <td>
                      <input
                        type="text"
                        value={formData?.installationDate || ""}
                        readOnly
                        className="celldetails"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Business Type</td>
                    <td>
                      <input
                        type="text"
                        value={formData.leadId?.businessType.name || ""}
                        readOnly
                        className="celldetails"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Assign Branch</td>
                    <td>
                      <input
                        type="text"
                        value={formData.leadId?.assignBranch.branchName || ""}
                        readOnly
                        className="celldetails"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Installed By</td>
                    <td>
                      <input
                        type="text"
                        value={formData.leadId?.assignedExecutive.username || ""}
                        readOnly
                        className="celldetails"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Service Status</td>
                    <td>
                      <input
                        type="text"
                        value={formData.leadId?.status.name || ""}
                        readOnly
                        className="celldetails"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>No Of Visit</td>
                    <td>
                      <input
                        type="text"
                        value={formData.leadId?._id || ""}
                        readOnly
                        className="celldetails"
                      />
                    </td>
                  </tr>
                  {/* <tr>
                    <td>Service Period</td>
                    <td>
                      <input
                        type="text"
                        value={formData?._id || ""}
                        readOnly
                        className="table-input"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Extra Features</td>
                    <td>
                      <input
                        type="text"
                        value={formData?._id || ""}
                        readOnly
                        className="table-input"
                      />
                    </td>
                  </tr> */}
                </tbody>
              </table>

            </div>

            {/* Call Form */}

            <div className="call-form">

              <div className="top-info">
                <div>
                  <label>Contact Person</label>
                  {/* <input type="text" value="N/A" readOnly /> */}
                  <input
                    type="text"
                    value={formData.leadId?.contactPerson || ""}
                    readOnly
                    // className="table-input"
                  />
                </div>

                <div>
                  <label>Contact No</label>
                  {/* <input type="text" value="N/A" readOnly /> */}
                  <input
                    type="text"
                    value={formData?.mobile || ""}
                    readOnly
                    // className="table-input"
                  />
                </div>
              </div>

              <div className="form-grid">

                <select
                  {...register("Service", {
                    required: "Mode Of Service is required",
                  })}
                >
                  <option value="">Mode Of Service</option>
                  {Service.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.modeOfService && (
                  <p className="error">{errors.modeOfService.message}</p>
                )}

                <select
                  {...register("Inward", {
                    required: "Call Inward is required",
                  })}
                >
                  <option value="">Call Inward</option>
                  {inward.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.callInward && (
                  <p className="error">{errors.callInward.message}</p>
                )}

                <select
                  {...register("cellstatus", {
                    required: "Call Status is required",
                  })}
                >
                  <option value="">Call Status</option>
                  {Status.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.callStatus && (
                  <p className="error">{errors.callStatus.message}</p>
                )}

                <select
                  {...register("AssiginedTo", {
                    required: "Assigined To is required",
                  })}
                >
                  <option value="">Assigned To</option>
                  {executives.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.username}
                    </option>
                  ))}
                </select>
                {errors.assignedTo && (
                  <p className="error">{errors.assignedTo.message}</p>
                )}

                <select
                  {...register("Branch", {
                    required: "Branch is required",
                  })}
                >
                  <option value="">Branch</option>
                  {Branch.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.branchName}
                    </option>
                  ))}
                </select>
                {errors.branch && (
                  <p className="error">{errors.branch.message}</p>
                )}

                <input {...register("CellDate", {
                    required: " CellDate is required",
                  })} type="date" />

              </div>

              <div className="remarks">
                <h4>Engineer Remarks</h4>

                <textarea {...register("EngineerRemarks", {
                    required: " EngineerRemarks is required",
                  })}
                  rows="6"
                  placeholder="Enter Remarks"
                ></textarea>
              </div>

              <button type="submit" className="ssubmit-btn">
                ENTER CALL STATUS
              </button>

            </div>

          </div>
            </form>

          {/* History Tables */}

          {/* <div className="history-section">

            <div className="history-card">
              <h3>Online Call History</h3>

              <table>
                <thead>
                  <tr>
                    <th>Token No</th>
                    <th>Date</th>
                    <th>Call Remarks</th>
                    <th>Call Status</th>
                    <th>Followed By</th>
                    <th>Remarks</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1001</td>
                    <td>21-06-2026</td>
                    <td>Software Issue</td>
                    <td>Solved</td>
                    <td>Anupriya</td>
                    <td>Completed</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="history-card">
              <h3>Direct Visit Call History</h3>

              <table>
                <thead>
                  <tr>
                    <th>Token No</th>
                    <th>Date</th>
                    <th>Call Remarks</th>
                    <th>Call Status</th>
                    <th>Followed By</th>
                    <th>Remarks</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>2001</td>
                    <td>21-06-2026</td>
                    <td>Printer Service</td>
                    <td>Pending</td>
                    <td>Anupriya</td>
                    <td>Visit Required</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div> */}

          {/* Solved Calls */}

          {/* <div className="solved-card">

            <h3>List Of Solved Calls</h3>

            <table>
              <thead>
                <tr>
                  <th>Token No</th>
                  <th>Customer</th>
                  <th>Mobile</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>3001</td>
                  <td>Ravi Kumar</td>
                  <td>9876543210</td>
                  <td>Solved</td>
                  <td>21-06-2026</td>
                </tr>
              </tbody>
            </table>

          </div> */}

        </div>
      </div>
    </>
  );
}

export default Executives;