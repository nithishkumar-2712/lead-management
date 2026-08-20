import React, { useEffect,useRef, useState,useMemo } from "react";
import "./CRM.css";
import LeadTable from "./LeadTable";
import { useForm } from "react-hook-form";
import axios from "../Config/axios";
import {useLocation, useNavigate}from"react-router-dom"
import Customhook from "../components/Customhook";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";
import "react-loading-skeleton/dist/skeleton.css";
import {
  FaCodeBranch,
  FaCalendarAlt,
  FaPhoneVolume,
  FaTimesCircle,
  FaCheckCircle
} from "react-icons/fa";
function CRM() {
  const {register,handleSubmit,formState: { errors },} = useForm();
  const tableRef = useRef(null);
  const [isChecking, setIsChecking] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showLeadTable, setShowLeadTable] = useState(false);
  // console.log(` data new ${tableData}`);
  const [showTable, setShowTable] = useState(false);
  const [Leaddetails, setLeaddetails] = useState([]);
  // console.log(Leaddetails);
  const [selectedType, setSelectedType] = useState("today");
  // console.log(Leaddetails)
  const navigate = useNavigate();
  const {
    Data: Leadcount,
    Loading: LeadLoading,
  } = Customhook("/api/leadget");

  // console.log(Leadcount);
const handleStatusClick = (type) => {
  let data;

  if (type === "Demo") {
    data = filteredLeads.filter(
      (item) =>
        item.status?.name === "Demo" &&
        !item.assignBranch
    );
  } else if (type === "Branch") {
    data = filteredLeads.filter(
      (item) =>
        item.status?.name === "Demo" &&
        item.assignBranch
    );
  } else {
    data = filteredLeads.filter(
      (item) => item.status?.name === type
    );
  }

  setTableData(data);
  setShowLeadTable(data.length > 0);

  if (data.length > 0) {
    setTimeout(() => {
      tableRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }
};

  // useEffect(() => {
  //     if (Leadcount) {
  //         setTableData(Leadcount);
  //     }
  // }, [Leadcount]);
  const onSubmit = async (mobile) => {
      if (isChecking) return;

      setIsChecking(true);
    try {
      const { data } = await axios.post("/api/find-mobile", mobile);

      if (data.success) {
        setShowTable(true);
        setLeaddetails(data.data);

        await Swal.fire({
          title: "Lead Found",
          text: "This mobile number already exists.",
          icon: "info",
          confirmButtonText: "OK",
        });

      } else {
        setShowTable(false);

        await Swal.fire({
          title: "New Lead",
          text: "No lead found. Redirecting to Lead Form...",
          icon: "success",
          confirmButtonText: "OK",
        });
        const number=mobile
        navigate(`/LeadForm/${number.mobile}`, {
          state: { leadnumber: mobile },
        });
        // console.log(mobile);
      }
    } catch (error) {
      // console.log(error);

      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }finally{
      setIsChecking(false);
    }
  };
  const handleCardClick = (type) => {
    // console.log(type);
    setSelectedType(type);
  };

const filteredLeads = useMemo(() => {
  if (!Leadcount?.length) return [];

  const today = new Date();

  return Leadcount.filter((lead) => {
    const createdDate = new Date(lead.updatedAt);

    switch (selectedType) {
      case "today":
        return (
          createdDate.toDateString() === today.toDateString()
        );

      case "thisWeek": {
        const startOfWeek = new Date(today);

        startOfWeek.setDate(
          today.getDate() - (today.getDay() || 7) + 1
        );

        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);

        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        return (
          createdDate >= startOfWeek &&
          createdDate <= endOfWeek
        );
      }

      case "lastWeek": {
        const startOfThisWeek = new Date(today);

        startOfThisWeek.setDate(
          today.getDate() - (today.getDay() || 7) + 1
        );

        startOfThisWeek.setHours(0, 0, 0, 0);

        const startOfLastWeek = new Date(startOfThisWeek);

        startOfLastWeek.setDate(
          startOfThisWeek.getDate() - 7
        );

        const endOfLastWeek = new Date(startOfThisWeek);

        endOfLastWeek.setMilliseconds(-1);

        return (
          createdDate >= startOfLastWeek &&
          createdDate <= endOfLastWeek
        );
      }

      case "thisMonth":
        return (
          createdDate.getMonth() === today.getMonth() &&
          createdDate.getFullYear() === today.getFullYear()
        );

      default:
        return true;
    }
  });
}, [Leadcount, selectedType]);

  // const filteredLeads = getFilteredLeads();
  // console.log(filteredLeads)

const statusCount = useMemo(() => {
  return filteredLeads.reduce(
    (acc, lead) => {
      const status = lead.status?.name;

      if (status === "Demo") {
        if (lead.assignBranch != null) {
          acc.branch++;
        } else {
          acc.demo++;
        }

        return acc;
      }

      switch (status) {
        case "Busy / Call Later":
          acc.busy++;
          break;

        case "No Interest":
          acc.noInterest++;
          break;

        case "Rejected":
          acc.rejected++;
          break;

        case "Yes":
          acc.yes++;
          break;

        case "Call Again":
          acc.callAgain++;
          break;

        case "Rescheduled":
          acc.rescheduled++;
          break;

        case "Success":
          acc.success++;
          break;

        case "More Demo":
          acc.moreDemo++;
          break;

        case "Pending":
          acc.pending++;
          break;

        default:
          break;
      }

      return acc;
    },
    {
      demo: 0,
      busy: 0,
      branch: 0,
      noInterest: 0,
      rejected: 0,
      yes: 0,
      callAgain: 0,
      rescheduled: 0,
      success: 0,
      moreDemo: 0,
      pending: 0,
    }
  );
}, [filteredLeads]);

const dateCounts = useMemo(() => {
  if (!Leadcount?.length) {
    return {
      today: 0,
      thisWeek: 0,
      lastWeek: 0,
      thisMonth: 0,
    };
  }

  const today = new Date();

  const startOfToday = new Date(today);
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date(today);
  endOfToday.setHours(23, 59, 59, 999);

  // This Week
  const startOfWeek = new Date(today);

  startOfWeek.setDate(
    today.getDate() - (today.getDay() || 7) + 1
  );

  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);

  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  // Last Week
  const startOfLastWeek = new Date(startOfWeek);

  startOfLastWeek.setDate(
    startOfWeek.getDate() - 7
  );

  const endOfLastWeek = new Date(startOfWeek);

  endOfLastWeek.setMilliseconds(-1);

  let todayCount = 0;
  let thisWeekCount = 0;
  let lastWeekCount = 0;
  let thisMonthCount = 0;

  Leadcount.forEach((lead) => {
    const date = new Date(lead.updatedAt);

    if (date >= startOfToday && date <= endOfToday) {
      todayCount++;
    }

    if (date >= startOfWeek && date <= endOfWeek) {
      thisWeekCount++;
    }

    if (date >= startOfLastWeek && date <= endOfLastWeek) {
      lastWeekCount++;
    }

    if (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      thisMonthCount++;
    }
  });

  return {
    today: todayCount,
    thisWeek: thisWeekCount,
    lastWeek: lastWeekCount,
    thisMonth: thisMonthCount,
  };
}, [Leadcount]);

const {
  today: todayCount,
  thisWeek: thisWeekCount,
  lastWeek: lastWeekCount,
  thisMonth: thisMonthCount,
} = dateCounts;

  if (LeadLoading) {
    return (
      <div className="crm-loading">

        {/* Search Box */}
        <div className="loading-search">
          <Skeleton height={35} width="40%" />
          <Skeleton height={50} style={{ marginTop: 20 }} />
          <Skeleton height={50} style={{ marginTop: 15 }} />
        </div>

        {/* Dashboard Header */}
        <Skeleton height={45} width="35%" style={{ marginTop: 30 }} />

        {/* Cards */}
        <div className="loading-cards">
          {[1, 2, 3, 4].map((item) => (
            <div className="loading-card" key={item}>
              <Skeleton height={35} width="45%" />
              <Skeleton height={25} width="80%" style={{ marginTop: 15 }} />
            </div>
          ))}
        </div>

        {/* Tables */}
        {[1, 2, 3].map((item) => (
          <div className="loading-table" key={item}>
            <Skeleton height={35} width="30%" />

            <Skeleton height={45} style={{ marginTop: 20 }} />

            {[1, 2, 3, 4].map((row) => (
              <Skeleton
                key={row}
                height={35}
                style={{ marginTop: 12 }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
  return (
    <>
    <div className="body">
        {/* Lead  Check  */}
        <div className={`lead-section ${showTable ? "show-table" : "hide-table"}`}>
          <div className="right-box">
              <h2>Check Mobile Number</h2>
              <form className="form" onSubmit={handleSubmit(onSubmit)}>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="Enter mobile number"
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Mobile number must be exactly 10 digits",
                    },
                  })}
                />

                {errors.mobile && (
                  <p style={{ color: "red" }}>
                    {errors.mobile.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isChecking}
                  className="check-btn"
                >
                  {isChecking ? (
                    <>
                      <span className="check-spinner"></span>
                      Checking...
                    </>
                  ) : (
                    "Check"
                  )}
                </button>

              </form>
              {/* <p className="hint">
                Enter a valid 10-digit number
              </p> */}
          </div>

          {showTable && (
            <div className="left-box">
              <h2>Lead Details</h2>

              {/* Desktop Table */}
              <div className="table-wrapperr">
                <table>
                  <thead>
                    <tr>
                      <th>Lead Id</th>
                      <th>Lead Date</th>
                      <th>Tele Caller</th>
                      <th>Mobile Number</th>
                      <th>Status</th>
                      <th>Go To</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{Leaddetails._id}</td>
                      <td>{Leaddetails.createdAt.split("T")[0]}</td>
                      <td>{Leaddetails.assignedUser.username}</td>
                      <td>{Leaddetails.mobile}</td>
                      <td>
                        <span className="activee">
                          {Leaddetails.status.name}
                        </span>
                      </td>
                      <td>
                        <button
                          className="go-btn mobile-btn"
                          onClick={() =>
                            navigate(`/LeadView/${Leaddetails._id}`, {state: Leaddetails,
                            })
                          }
                        >
                          View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Mobile Card */}
              <div className="lead-card-mobile">
                <div className="lead-card">
                  <div className="card-row">
                    <span>Lead ID</span>
                    <strong>{Leaddetails._id}</strong>
                  </div>

                  <div className="card-row">
                    <span>Date</span>
                    <strong>{Leaddetails.createdAt.split("T")[0]}</strong>
                  </div>

                  <div className="card-row">
                    <span>Tele Caller</span>
                    <strong>{Leaddetails.assignedUser.username}</strong>
                  </div>

                  <div className="card-row">
                    <span>Mobile</span>
                    <strong>{Leaddetails.mobile}</strong>
                  </div>

                  <div className="card-row">
                    <span>Status</span>

                    <span
                      className={
                        Leaddetails?.status?.name === "Success" ||
                        Leaddetails?.status?.name === "Demo"
                          ? "activee"
                          : "inactivee"
                      }
                    >
                      {Leaddetails?.status?.name}
                    </span>
                  </div>

                  <button
                    className="go-btn mobile-btn"
                    onClick={() =>
                      navigate(`/LeadView/${Leaddetails._id}`, {state: Leaddetails,
                      })
                    }
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Dashbord */} 
        <div className="dashboardd">
            {/* Header */}
            {/* <h3 className="h3">
              Lead Management Dashboard
            </h3> */}

            {/* Top Cards */}
            <div className="containeerr">

              <div
                className={`cardd ${selectedType === "today" ? "active-card" : ""}`}
                onClick={() => handleCardClick("today")}
              >
                <h2>{todayCount}</h2>
                <p>Today</p>
              </div>

              <div
                className={`cardd ${selectedType === "thisWeekCount" ? "active-card" : ""}`}
                onClick={() => handleCardClick("thisWeekCount")}
              >
                <h2>{thisWeekCount}</h2>
                <p>This Week</p>
              </div>

              <div
                className={`cardd ${selectedType === "lastWeekCount" ? "active-card" : ""}`}
                onClick={() => handleCardClick("lastWeekCount")}
              >
                <h2>{lastWeekCount}</h2>
                <p>Last Week</p>
              </div>

              <div
                className={`cardd ${selectedType === "thisMonth" ? "active-card" : ""}`}
                onClick={() => handleCardClick("thisMonth")}
              >
                <h2>{thisMonthCount}</h2>
                <p>This Months</p>
              </div>

            </div>

            {/* Demo Request Status */}
            <div className="section">
              <h3>Demo Request Status</h3>

              <table>
                <thead>
                  <tr>
                    <th>Demo</th>
                    <th>Busy / Call Later</th>
                    <th>Branch</th>
                    <th>No Interest</th>
                    <th>Rejected</th>
                  </tr>
                </thead>

                  <tbody>
                    <tr>
                      <td>
                        <button
                          className="status-btn demo"
                          onClick={() => handleStatusClick("Demo")}
                        >
                          {statusCount.demo}
                        </button>
                      </td>

                      <td>
                        <button
                          className="status-btn busy"
                          onClick={() => handleStatusClick("Busy / Call Later")}
                        >
                          {statusCount.busy}
                        </button>
                      </td>

                      <td>
                      <button
                        className="status-btn branch"
                        onClick={() => handleStatusClick("Branch")}
                      >
                        {statusCount.branch}
                      </button>
                      </td>

                      <td>
                        <button
                          className="status-btn nointerest"
                          onClick={() => handleStatusClick("No Interest")}
                        >
                          {statusCount.noInterest}
                        </button>
                      </td>

                      <td>
                        <button
                          className="status-btn rejected"
                          onClick={() => handleStatusClick("Rejected")}
                        >
                          {statusCount.rejected}
                        </button>
                      </td>
                    </tr>
                  </tbody>
              </table>
            </div>

            {/* Demo Confirmation */}
            <div className="section">
              <h3>Demo Confirmation</h3>

              <table>
                <thead>
                  <tr>
                    <th>Yes</th>
                    <th>Call Again</th>
                    <th>Rescheduled</th>
                    {/* <th>Rejected</th> */}
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                    <button
                    className="status-btn success"
                    onClick={() => handleStatusClick("Yes")}
                    >
                    {statusCount.yes}
                    </button>
                    </td>
                    <td>
                      <button
                      className="status-btn busy"
                      onClick={() => handleStatusClick("Call Again")}
                      >
                      {statusCount.callAgain}
                      </button>
                    </td>
                    <td>
                      <button
                      className="status-btn branch"
                      onClick={() => handleStatusClick("Rescheduled")}
                      >
                      {statusCount.rescheduled}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Demo Result */}
            <div className="section">
              <h3>Demo Result</h3>

              <table>
                <thead>
                  <tr>
                    <th>Success</th>
                    <th>More Demo</th>
                    <th>Pending</th>
                    {/* <th>Rejected</th> */}
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <button
                      className="status-btn success"
                      onClick={() => handleStatusClick("Success")}
                      >
                      {statusCount.success}
                      </button>
                    </td>
                    <td>
                      <button
                      className="status-btn demo"
                      onClick={() => handleStatusClick("More Demo")}
                      >
                      {statusCount.moreDemo}
                      </button>
                    </td>
                    <td>
                      <button
                      className="status-btn pending"
                      onClick={() => handleStatusClick("Pending")}
                      >
                      {statusCount.pending}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobli Screen */}
            <div className="mobile-status-container">

              <p className="para">Lead Status</p>

              <div className="mobile-status-grid">

                {/* Branch */}
                <div
                  className="mobile-status-card demo"
                  onClick={() => handleStatusClick("Branch")}
                >
                  <FaCodeBranch className="status-icon" />
                  <h4>Branch</h4>
                  <h2>{statusCount.branch}</h2>
                </div>

                {/* Rescheduled */}
                {/* <div
                  className="mobile-status-card call"
                  onClick={() => handleStatusClick("Rescheduled")}
                >
                  <FaCalendarAlt className="status-icon" />
                  <h4>Rescheduled</h4>
                  <h2>{statusCount.rescheduled}</h2>
                </div> */}

                  {/* Call Later */}
                <div
                  className="mobile-status-card success"
                  onClick={() => handleStatusClick("Busy / Call Later")}
                >
                  <FaPhoneVolume className="status-icon" />
                  <h4>Busy/CallLate</h4>
                  <h2>{statusCount.busy}</h2>
                </div>
                
                {/* Success */}
                <div
                  className="mobile-status-card success"
                  onClick={() => handleStatusClick("Success")}
                >
                  <FaCheckCircle className="status-icon" />
                  <h4>Success</h4>
                  <h2>{statusCount.success}</h2>
                </div>
                
                {/* Rejected */}
                <div
                  className="mobile-status-card pending"
                  onClick={() => handleStatusClick("Rejected")}
                >
                  <FaTimesCircle className="status-icon" />
                  <h4>Rejected</h4>
                  <h2>{statusCount.rejected}</h2>
                </div> 

              </div>

            </div>

          <div ref={tableRef}>
            {showLeadTable && tableData.length > 0 && (
              <LeadTable data={tableData} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CRM;