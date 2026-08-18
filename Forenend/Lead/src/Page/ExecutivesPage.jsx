import React, { useEffect,useRef, useState } from "react";
import "./CRM.css";
import LeadTable from "./LeadTable";
import { useForm } from "react-hook-form";
import axios from "../Config/axios";
import {useLocation, useNavigate}from"react-router-dom"
import Customhook from "../components/Customhook";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Leadheadertable from "./Leadheadertable";
import Leadexcutivetable from "./Leadexcutivetable";

function ExecutivesPage() {
  const {register,handleSubmit,formState: { errors },} = useForm();
    const tableRef = useRef(null);
  const [tableData, setTableData] = useState([]);
    const [showLeadTable, setShowLeadTable] = useState(false);
  // console.log(` data new ${tableData}`);
  const [showTable, setShowTable] = useState(false);
  const [Leaddetails, setLeaddetails] = useState([]);
  // console.log(Leaddetails);
  const [selectedType, setSelectedType] = useState("today");
  // console.log(Leaddetails)
  const navigate = useNavigate();
  // const {
  //   Data: Leadcount,
  //   Loading: LeadLoading,
  // } = Customhook("/api/leadget");
  const {
    Data: Leadcount,
    Loading: LeadLoading,
  } = Customhook("/api/Excutive-leads");
  // console.log(Leadcount);

    // console.log(Leadcount);
  const handleStatusClick = (type) => {

    const data = filteredLeads.filter(
      (item) => item.status?.name === type
    );

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
  useEffect(() => {
      if (Leadcount) {
          setTableData(Leadcount);
      }
  }, [Leadcount]);
  const handleCardClick = (type) => {
    // console.log(type);
    setSelectedType(type);
  };

  const getFilteredLeads = () => {
    if (!Leadcount) return [];

    const today = new Date();

    return Leadcount.filter((lead) => {
      const createdDate = new Date(lead.updatedAt);

      switch (selectedType) {
        case "today":
          return createdDate.toDateString() === today.toDateString();

        case "thisMonth":
          return (
            createdDate.getMonth() === today.getMonth() &&
            createdDate.getFullYear() === today.getFullYear()
          );

        case "last3Months": {
          const last3 = new Date();
          last3.setMonth(today.getMonth() - 3);
          return createdDate >= last3;
        }

        case "last6Months": {
          const last6 = new Date();
          last6.setMonth(today.getMonth() - 6);
          return createdDate >= last6;
        }

        default:
          return true;
      }
    });
  };

  const filteredLeads = getFilteredLeads();
  // console.log(filteredLeads)

  const statusCount = filteredLeads.reduce(
    (acc, lead) => {

      switch (lead.status?.name) {

        case "Demo":
          acc.demo++;
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

        case "Pending":
          acc.pending++;
          break;

        case "More Demo":
          acc.moreDemo++;
          break;

        default:
          break;
      }

      return acc;

    },
    {
      demo: 0,
      yes: 0,
      callAgain: 0,
      rescheduled: 0,
      success: 0,
      pending: 0,
      moreDemo: 0,
    }
  );


  const todayCount = Leadcount?.filter((lead) => {
    return (
      new Date(lead.updatedAt).toDateString() === new Date().toDateString()
    );
  }).length;

  const thisMonthCount = Leadcount?.filter((lead) => {
    const d = new Date(lead.updatedAt);
    const now = new Date();

    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  }).length;

  const last3MonthCount = Leadcount?.filter((lead) => {
    const last3 = new Date();
    last3.setMonth(last3.getMonth() - 3);

    return new Date(lead.updatedAt) >= last3;
  }).length;

  const last6MonthCount = Leadcount?.filter((lead) => {
    const last6 = new Date();
    last6.setMonth(last6.getMonth() - 6);

    return new Date(lead.updatedAt) >= last6;
  }).length;

  if (LeadLoading) {
    return (
      <div className="crm-loading">
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
        {/* Dashbord */} 
        <div className="dashboardd">
            {/* Header */}
            <div className="header">
              Lead Excutive  Dashboard
            </div>

            {/* Top Cards */}
            <div className="containeerr">
              <div
                className={`cardd ${selectedType === "last6Months" ? "active-card" : ""}`}
                onClick={() => handleCardClick("last6Months")}
              >
                <h2>{last6MonthCount}</h2>
                <p>Last 6 Months</p>
              </div>

              <div
                className={`cardd ${selectedType === "last3Months" ? "active-card" : ""}`}
                onClick={() => handleCardClick("last3Months")}
              >
                <h2>{last3MonthCount}</h2>
                <p>Last 3 Month</p>
              </div>

              <div
                className={`cardd ${selectedType === "thisMonth" ? "active-card" : ""}`}
                onClick={() => handleCardClick("thisMonth")}
              >
                <h2>{thisMonthCount}</h2>
                <p>This Month</p>
              </div>

              <div
                className={`cardd ${selectedType === "today" ? "active-card" : ""}`}
                onClick={() => handleCardClick("today")}
              >
                <h2>{todayCount}</h2>
                <p>Today</p>
              </div>
            </div> 

            {/* Demo Confirmation */}
            <div className="section">
              <h3>Demo Confirmation</h3>

              <table>
                <thead>
                  <tr>
                    <th>DemoAssigned</th>
                    <th>Yes</th>
                    <th>Call Again</th>
                    <th>Rescheduled</th>
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
        </div>
        <div ref={tableRef}>
          {showLeadTable && tableData.length > 0 && (
            <Leadexcutivetable data={tableData} />
          )}
        </div>
      </div>
    </>
  );
}

export default ExecutivesPage;