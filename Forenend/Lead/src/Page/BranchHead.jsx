import React, { useMemo, useRef, useState } from "react";
import "./CRM.css";
import { useNavigate } from "react-router-dom";
import Customhook from "../components/Customhook";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Leadheadertable from "./Leadheadertable";

import {
  FaCalendarCheck,
  FaPhoneAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaUserTie,
} from "react-icons/fa";

function BranchHead() {
  const tableRef = useRef(null);

  const [tableData, setTableData] = useState([]);
  const [showLeadTable, setShowLeadTable] = useState(false);
  const [selectedType, setSelectedType] = useState("today");

  const {
    Data: Leadcount,
    Loading: LeadLoading,
    CustomHook: RefreshLeads,
  } = Customhook("/api/user-leads");

  // =====================================================
  // DATE RANGE - useMemo
  // =====================================================

  const dateRanges = useMemo(() => {
    const today = new Date();

    // Start of Today
    const startOfToday = new Date(today);
    startOfToday.setHours(0, 0, 0, 0);

    // End of Today
    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);

    // Start of This Week - Monday
    const startOfThisWeek = new Date(today);
    startOfThisWeek.setDate(
      today.getDate() - (today.getDay() || 7) + 1
    );
    startOfThisWeek.setHours(0, 0, 0, 0);

    // End of This Week
    const endOfThisWeek = new Date(startOfThisWeek);
    endOfThisWeek.setDate(startOfThisWeek.getDate() + 6);
    endOfThisWeek.setHours(23, 59, 59, 999);

    // Start of Last Week
    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);

    // End of Last Week
    const endOfLastWeek = new Date(startOfThisWeek);
    endOfLastWeek.setMilliseconds(-1);

    return {
      today,
      startOfToday,
      endOfToday,
      startOfThisWeek,
      endOfThisWeek,
      startOfLastWeek,
      endOfLastWeek,
    };
  }, []);

  // =====================================================
  // FILTERED LEADS
  // =====================================================

  const filteredLeads = useMemo(() => {
    if (!Leadcount?.length) return [];

    const {
      startOfToday,
      endOfToday,
      startOfThisWeek,
      endOfThisWeek,
      startOfLastWeek,
      endOfLastWeek,
    } = dateRanges;

    return Leadcount.filter((lead) => {
      const updatedDate = new Date(lead.updatedAt);

      switch (selectedType) {
        case "today":
          return (
            updatedDate >= startOfToday &&
            updatedDate <= endOfToday
          );

        case "thisWeek":
          return (
            updatedDate >= startOfThisWeek &&
            updatedDate <= endOfThisWeek
          );

        case "lastWeek":
          return (
            updatedDate >= startOfLastWeek &&
            updatedDate <= endOfLastWeek
          );

        case "thisMonth": {
          const now = dateRanges.today;

          return (
            updatedDate.getMonth() === now.getMonth() &&
            updatedDate.getFullYear() === now.getFullYear()
          );
        }

        default:
          return true;
      }
    });
  }, [Leadcount, selectedType, dateRanges]);

  // =====================================================
  // STATUS COUNT
  // =====================================================

  const statusCount = useMemo(() => {
    return filteredLeads.reduce(
      (acc, lead) => {
        const status = lead.status?.name;

        // Demo Assignment
        if (status === "Demo") {
          if (lead.assignedExecutive == null) {
            acc.demo++;
          } else {
            acc.executive++;
          }

          return acc;
        }

        switch (status) {
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

          case "Rejected":
            acc.rejected++;
            break;

          case "Busy / Call Later":
            acc.busy++;
            break;

          default:
            break;
        }

        return acc;
      },
      {
        demo: 0,
        executive: 0,
        yes: 0,
        callAgain: 0,
        rescheduled: 0,
        success: 0,
        pending: 0,
        moreDemo: 0,
        rejected: 0,
        busy: 0,
      }
    );
  }, [filteredLeads]);

  // =====================================================
  // DASHBOARD COUNTS
  // =====================================================

  const dashboardCounts = useMemo(() => {
    if (!Leadcount?.length) {
      return {
        today: 0,
        thisWeek: 0,
        lastWeek: 0,
        thisMonth: 0,
      };
    }

    const {
      startOfToday,
      endOfToday,
      startOfThisWeek,
      endOfThisWeek,
      startOfLastWeek,
      endOfLastWeek,
      today,
    } = dateRanges;

    let todayCount = 0;
    let thisWeekCount = 0;
    let lastWeekCount = 0;
    let thisMonthCount = 0;

    Leadcount.forEach((lead) => {
      const date = new Date(lead.updatedAt);

      if (
        date >= startOfToday &&
        date <= endOfToday
      ) {
        todayCount++;
      }

      if (
        date >= startOfThisWeek &&
        date <= endOfThisWeek
      ) {
        thisWeekCount++;
      }

      if (
        date >= startOfLastWeek &&
        date <= endOfLastWeek
      ) {
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
  }, [Leadcount, dateRanges]);

  // =====================================================
  // STATUS CLICK
  // =====================================================

  const handleStatusClick = (type) => {
    let data = [];

    if (type === "Demo") {
      data = filteredLeads.filter(
        (item) =>
          item.status?.name === "Demo" &&
          item.assignedExecutive == null
      );
    } else if (type === "Executive") {
      data = filteredLeads.filter(
        (item) =>
          item.status?.name === "Demo" &&
          item.assignedExecutive != null
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

  // =====================================================
  // CARD CLICK
  // =====================================================

  const handleCardClick = (type) => {
    setSelectedType(type);
  };

  // =====================================================
  // LOADING
  // =====================================================

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

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="body">

      <div className="dashboardd">

        {/* Header */}
        <div className="header">
          Branch Head Dashboard
        </div>

        {/* ================= TOP CARDS ================= */}

        <div className="containeerr">

          <div
            className={`cardd ${
              selectedType === "today"
                ? "active-card"
                : ""
            }`}
            onClick={() =>
              handleCardClick("today")
            }
          >
            <h2>{dashboardCounts.today}</h2>
            <p>Today</p>
          </div>

          <div
            className={`cardd ${
              selectedType === "thisWeek"
                ? "active-card"
                : ""
            }`}
            onClick={() =>
              handleCardClick("thisWeek")
            }
          >
            <h2>{dashboardCounts.thisWeek}</h2>
            <p>This Week</p>
          </div>

          <div
            className={`cardd ${
              selectedType === "lastWeek"
                ? "active-card"
                : ""
            }`}
            onClick={() =>
              handleCardClick("lastWeek")
            }
          >
            <h2>{dashboardCounts.lastWeek}</h2>
            <p>Last Week</p>
          </div>

          <div
            className={`cardd ${
              selectedType === "thisMonth"
                ? "active-card"
                : ""
            }`}
            onClick={() =>
              handleCardClick("thisMonth")
            }
          >
            <h2>{dashboardCounts.thisMonth}</h2>
            <p>This Month</p>
          </div>

        </div>

        {/* ================= DEMO REQUEST ================= */}

        <div className="section">

          <h3>Demo Request Status</h3>

          <table>
            <thead>
              <tr>
                <th>Demo Assigned</th>
                <th>Executive Assigned</th>
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
                    className="status-btn busy"
                    onClick={() =>
                      handleStatusClick("Executive")
                    }
                  >
                    {statusCount.executive}
                  </button>
                </td>

              </tr>
            </tbody>
          </table>

        </div>

        {/* ================= DEMO CONFIRMATION ================= */}

        <div className="section">

          <h3>Demo Confirmation</h3>

          <table>

            <thead>
              <tr>
                <th>Rejected</th>
                <th>Call Again</th>
                <th>Rescheduled</th>
              </tr>
            </thead>

            <tbody>
              <tr>

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

                <td>
                  <button
                    className="status-btn busy"
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
                    className="status-btn branch"
                    onClick={() =>
                      handleStatusClick(
                        "Rescheduled"
                      )
                    }
                  >
                    {statusCount.rescheduled}
                  </button>
                </td>

              </tr>
            </tbody>

          </table>

        </div>

        {/* ================= DEMO RESULT ================= */}

        <div className="section">

          <h3>Demo Result</h3>

          <table>

            <thead>
              <tr>
                <th>Success</th>
                <th>More Demo</th>
                <th>Pending</th>
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
                      handleStatusClick("More Demo")
                    }
                  >
                    {statusCount.moreDemo}
                  </button>
                </td>

                <td>
                  <button
                    className="status-btn pending"
                    onClick={() =>
                      handleStatusClick("Pending")
                    }
                  >
                    {statusCount.pending}
                  </button>
                </td>

              </tr>
            </tbody>

          </table>

        </div>

        {/* ================= MOBILE STATUS ================= */}

        <div className="mobile-status-container">

          <p className="para">
            Lead Status
          </p>

          <div className="mobile-status-grid">

            <div
              className="mobile-status-card demo"
              onClick={() =>
                handleStatusClick("Demo")
              }
            >
              <FaCalendarCheck className="status-icon" />
              <h4>Demo Assigned</h4>
              <h2>{statusCount.demo}</h2>
            </div>

            <div
              className="mobile-status-card demo"
              onClick={() =>
                handleStatusClick("Executive")
              }
            >
              <FaUserTie className="status-icon" />
              <h4>Ex- Assigned</h4>
              <h2>{statusCount.executive}</h2>
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

        {/* ================= TABLE ================= */}

        <div ref={tableRef}>
          {showLeadTable &&
            tableData.length > 0 && (
              <Leadheadertable
                data={tableData}
                onLeadUpdated={RefreshLeads}
              />
            )}
        </div>

      </div>

    </div>
  );
}

export default BranchHead;