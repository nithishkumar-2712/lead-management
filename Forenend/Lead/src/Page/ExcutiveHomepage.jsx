import React, { useMemo, useRef, useState } from "react";
import "./CRM.css";
import Customhook from "../components/Customhook";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Leadexcutivetable from "./Leadexcutivetable";

import {
  FaCalendarCheck,
  FaPhoneAlt,
  FaCheckCircle,
  FaTimesCircle
} from "react-icons/fa";

function ExcutiveHomepage() {

  const tableRef = useRef(null);

  const [tableData, setTableData] = useState([]);
  const [showLeadTable, setShowLeadTable] = useState(false);
  const [selectedType, setSelectedType] = useState("today");

  const {
    Data: Leadcount,
    Loading: LeadLoading,
  } = Customhook("/api/Excutive-leads");


  // ==========================================
  // DATE RANGE
  // ==========================================

  const dateRange = useMemo(() => {

    const today = new Date();

    // Today
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

    endOfWeek.setDate(
      startOfWeek.getDate() + 6
    );

    endOfWeek.setHours(23, 59, 59, 999);


    // Last Week
    const startOfLastWeek = new Date(startOfWeek);

    startOfLastWeek.setDate(
      startOfWeek.getDate() - 7
    );

    const endOfLastWeek = new Date(startOfWeek);

    endOfLastWeek.setMilliseconds(-1);


    // This Month
    const startOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const endOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    endOfMonth.setHours(23, 59, 59, 999);


    return {
      startOfToday,
      endOfToday,

      startOfWeek,
      endOfWeek,

      startOfLastWeek,
      endOfLastWeek,

      startOfMonth,
      endOfMonth
    };

  }, []);


  // ==========================================
  // FILTERED LEADS
  // ==========================================

  const filteredLeads = useMemo(() => {

    if (!Leadcount?.length) {
      return [];
    }

    const {
      startOfToday,
      endOfToday,
      startOfWeek,
      endOfWeek,
      startOfLastWeek,
      endOfLastWeek,
      startOfMonth,
      endOfMonth
    } = dateRange;


    return Leadcount.filter((lead) => {

      const date = new Date(lead.updatedAt);

      switch (selectedType) {

        case "today":
          return (
            date >= startOfToday &&
            date <= endOfToday
          );


        case "thisWeek":
          return (
            date >= startOfWeek &&
            date <= endOfWeek
          );


        case "lastWeek":
          return (
            date >= startOfLastWeek &&
            date <= endOfLastWeek
          );


        case "thisMonth":
          return (
            date >= startOfMonth &&
            date <= endOfMonth
          );


        default:
          return true;
      }

    });

  }, [Leadcount, selectedType, dateRange]);


  // ==========================================
  // STATUS COUNT
  // ==========================================

  const statusCount = useMemo(() => {

    return filteredLeads.reduce(
      (acc, lead) => {

        switch (lead.status?.name) {

          case "Demo":
            acc.demo++;
            break;

          case "Yes":
            acc.yes++;
            break;

          case "Busy / Call Later":
            acc.busy++;
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

          case "Rejected":
            acc.rejected++;
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
        rejected: 0,
        busy: 0,
      }
    );

  }, [filteredLeads]);


  // ==========================================
  // DATE COUNTS
  // ==========================================

  const dateCounts = useMemo(() => {

    if (!Leadcount?.length) {
      return {
        today: 0,
        thisWeek: 0,
        lastWeek: 0,
        thisMonth: 0
      };
    }

    const {
      startOfToday,
      endOfToday,
      startOfWeek,
      endOfWeek,
      startOfLastWeek,
      endOfLastWeek,
      startOfMonth,
      endOfMonth
    } = dateRange;


    let today = 0;
    let thisWeek = 0;
    let lastWeek = 0;
    let thisMonth = 0;


    Leadcount.forEach((lead) => {

      const date = new Date(lead.updatedAt);


      if (
        date >= startOfToday &&
        date <= endOfToday
      ) {
        today++;
      }


      if (
        date >= startOfWeek &&
        date <= endOfWeek
      ) {
        thisWeek++;
      }


      if (
        date >= startOfLastWeek &&
        date <= endOfLastWeek
      ) {
        lastWeek++;
      }


      if (
        date >= startOfMonth &&
        date <= endOfMonth
      ) {
        thisMonth++;
      }

    });


    return {
      today,
      thisWeek,
      lastWeek,
      thisMonth
    };

  }, [Leadcount, dateRange]);


  // ==========================================
  // STATUS CLICK
  // ==========================================

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


  // ==========================================
  // CARD CLICK
  // ==========================================

  const handleCardClick = (type) => {

    setSelectedType(type);

    // Card change ஆனதும் previous table hide
    setShowLeadTable(false);
    setTableData([]);

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (LeadLoading) {

    return (
      <div className="crm-loading">

        <Skeleton
          height={45}
          width="35%"
          style={{ marginTop: 30 }}
        />

        <div className="loading-cards">

          {[1, 2, 3, 4].map((item) => (

            <div
              className="loading-card"
              key={item}
            >

              <Skeleton
                height={35}
                width="45%"
              />

              <Skeleton
                height={25}
                width="80%"
                style={{ marginTop: 15 }}
              />

            </div>

          ))}

        </div>


        {[1, 2, 3].map((item) => (

          <div
            className="loading-table"
            key={item}
          >

            <Skeleton
              height={35}
              width="30%"
            />

            <Skeleton
              height={45}
              style={{ marginTop: 20 }}
            />

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


  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="body">

      <div className="dashboardd">

        <h3 className="h3">
          Lead Executive Dashboard
        </h3>


        {/* TOP CARDS */}

        <div className="containeerr">

          <div
            className={`cardd ${
              selectedType === "today"
                ? "active-card"
                : ""
            }`}
            onClick={() => handleCardClick("today")}
          >

            <h2>{dateCounts.today}</h2>
            <p>Today</p>

          </div>


          <div
            className={`cardd ${
              selectedType === "thisWeek"
                ? "active-card"
                : ""
            }`}
            onClick={() => handleCardClick("thisWeek")}
          >

            <h2>{dateCounts.thisWeek}</h2>
            <p>This Week</p>

          </div>


          <div
            className={`cardd ${
              selectedType === "lastWeek"
                ? "active-card"
                : ""
            }`}
            onClick={() => handleCardClick("lastWeek")}
          >

            <h2>{dateCounts.lastWeek}</h2>
            <p>Last Week</p>

          </div>


          <div
            className={`cardd ${
              selectedType === "thisMonth"
                ? "active-card"
                : ""
            }`}
            onClick={() => handleCardClick("thisMonth")}
          >

            <h2>{dateCounts.thisMonth}</h2>
            <p>This Month</p>

          </div>

        </div>


        {/* DEMO CONFIRMATION */}

        <div className="section">

          <h3>Demo Confirmation</h3>

          <table>

            <thead>

              <tr>
                <th>Demo Assigned</th>
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
                    onClick={() =>
                      handleStatusClick("Demo")
                    }
                  >
                    {statusCount.demo}
                  </button>

                </td>


                <td>

                  <button
                    className="status-btn success"
                    onClick={() =>
                      handleStatusClick("Yes")
                    }
                  >
                    {statusCount.yes}
                  </button>

                </td>


                <td>

                  <button
                    className="status-btn busy"
                    onClick={() =>
                      handleStatusClick("Call Again")
                    }
                  >
                    {statusCount.callAgain}
                  </button>

                </td>


                <td>

                  <button
                    className="status-btn branch"
                    onClick={() =>
                      handleStatusClick("Rescheduled")
                    }
                  >
                    {statusCount.rescheduled}
                  </button>

                </td>

              </tr>

            </tbody>

          </table>

        </div>


        {/* DEMO RESULT */}

        <div className="section">

          <h3>Demo Result</h3>

          <table>

            <thead>

              <tr>
                <th>Success</th>
                <th>Busy / Call Later</th>
                <th>Rejected</th>
              </tr>

            </thead>


            <tbody>

              <tr>

                <td>

                  <button
                    className="status-btn success"
                    onClick={() =>
                      handleStatusClick("Success")
                    }
                  >
                    {statusCount.success}
                  </button>

                </td>


                <td>

                  <button
                    className="status-btn demo"
                    onClick={() =>
                      handleStatusClick(
                        "Busy / Call Later"
                      )
                    }
                  >
                    {statusCount.busy}
                  </button>

                </td>


                <td>

                  <button
                    className="status-btn Danger"
                    onClick={() =>
                      handleStatusClick("Rejected")
                    }
                  >
                    {statusCount.rejected}
                  </button>

                </td>

              </tr>

            </tbody>

          </table>

        </div>


        {/* MOBILE */}

        <div className="mobile-status-container">

          <h3 className="mobile-title">
            Lead Status
          </h3>


          <div className="mobile-status-grid">

            <div
              className="mobile-status-card demo"
              onClick={() =>
                handleStatusClick("Demo")
              }
            >

              <FaCalendarCheck className="status-icon" />

              <h4>Demo</h4>

              <h2>{statusCount.demo}</h2>

            </div>


            <div
              className="mobile-status-card call"
              onClick={() =>
                handleStatusClick(
                  "Busy / Call Later"
                )
              }
            >

              <FaPhoneAlt className="status-icon" />

              <h4>Busy/CallLate</h4>

              <h2>{statusCount.busy}</h2>

            </div>


            <div
              className="mobile-status-card success"
              onClick={() =>
                handleStatusClick("Success")
              }
            >

              <FaCheckCircle className="status-icon" />

              <h4>Success</h4>

              <h2>{statusCount.success}</h2>

            </div>


            <div
              className="mobile-status-card pending"
              onClick={() =>
                handleStatusClick("Rejected")
              }
            >

              <FaTimesCircle className="status-icon" />

              <h4>Rejected</h4>

              <h2>{statusCount.rejected}</h2>

            </div>

          </div>

        </div>


        {/* LEAD TABLE */}

        <div ref={tableRef}>

          {showLeadTable &&
            tableData.length > 0 && (

              <Leadexcutivetable
                data={tableData}
              />

            )}

        </div>

      </div>

    </div>
  );
}

export default ExcutiveHomepage;