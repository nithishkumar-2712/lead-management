import React, { useMemo } from "react";
import "./AdminPage.css";
import Customhook from "../components/Customhook";

import {
  FaUsers,
  FaChartLine,
  FaTimesCircle,
  FaUserFriends,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const AdminPage = () => {

  // =========================
  // API DATA
  // =========================

  const {
    Data: Leadcount = [],
    Loading: LeadLoading,
  } = Customhook("/api/leadget");

  const {
    Data: InsulationData = [],
    Loading: InsulationLoading,
  } = Customhook("/api/Allinsulatrion");

  const {
    Data: Usercount = [],
    Loading: userLoading,
  } = Customhook("/api/Fetchuser");


  // =========================
  // MONTH NAMES
  // =========================

  const monthNames = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );


  // =========================
  // SUCCESS LEADS MONTHLY DATA
  // =========================

  const monthlySuccessData = useMemo(() => {

    return monthNames.map((month, index) => {

      const count = Leadcount.filter((item) => {

        // Only Success leads
        if (item.status?.name !== "Success") {
          return false;
        }

        // Date
        const date = new Date(item.updatedAt || item.createdAt);

        // Invalid date check
        if (isNaN(date.getTime())) {
          return false;
        }

        return date.getMonth() === index;

      }).length;

      return {
        month,
        success: count,
      };
    });

  }, [Leadcount, monthNames]);


  // =========================
  // OVERALL COUNTS
  // =========================

  const overallLeads = useMemo(() => {
    return Leadcount.length;
  }, [Leadcount]);


  const overallUser = useMemo(() => {
    return Usercount.length;
  }, [Usercount]);


  const successLeads = useMemo(() => {

    return Leadcount.filter(
      (item) => item.status?.name === "Success"
    ).length;

  }, [Leadcount]);


  const rejectedLeads = useMemo(() => {

    return Leadcount.filter(
      (item) => item.status?.name === "Rejected"
    ).length;

  }, [Leadcount]);


  // =========================
  // DASHBOARD CARDS
  // =========================

  const cards = useMemo(() => {

    return [

      {
        title: "Overall Leads",
        count: overallLeads,
        growth: "+18%",
        subtitle: "Compared to last month",
        icon: <FaUsers />,
        gradient: "from-blue-500 to-blue-700",
      },

      {
        title: "Success Leads",
        count: successLeads,
        growth: "+12%",
        subtitle: "Completed Success",
        icon: <FaUserFriends />,
        gradient: "from-green-500 to-emerald-600",
      },

      {
        title: "Rejected Leads",
        count: rejectedLeads,
        growth: "-6%",
        subtitle: "Lower than last month",
        icon: <FaTimesCircle />,
        gradient: "from-red-500 to-pink-600",
      },

      {
        title: "Total Users",
        count: overallUser,
        growth: "+10%",
        subtitle: "Registered users",
        icon: <FaChartLine />,
        gradient: "from-indigo-500 to-purple-600",
      },

    ];

  }, [
    overallLeads,
    successLeads,
    rejectedLeads,
    overallUser,
  ]);


  // =========================
  // LOADING
  // =========================

if (LeadLoading || InsulationLoading || userLoading) {
  return (
    <div className="admin-page">

      {/* ================= SKELETON CARDS ================= */}

      <div className="card-griidd">

        {[1, 2, 3, 4].map((item) => (
          <div
            className="dashboard-card skeleton-dashboard-card"
            key={item}
          >

            <div className="skeleton-card-content">

              <div className="skeleton skeleton-title"></div>

              <div className="skeleton skeleton-count"></div>

              <div className="skeleton skeleton-subtitle"></div>

            </div>

            <div className="skeleton skeleton-icon"></div>

          </div>
        ))}

      </div>


      {/* ================= SKELETON CHARTS ================= */}

      <div className="chart-griidd">

        {/* Monthly Success Chart */}

        <div className="chart-boox skeleton-chart-box">

          <div className="skeleton skeleton-chart-title"></div>

          <div className="skeleton-chart-area">

            <div className="skeleton-chart-line line-1"></div>
            <div className="skeleton-chart-line line-2"></div>
            <div className="skeleton-chart-line line-3"></div>
            <div className="skeleton-chart-line line-4"></div>

          </div>

        </div>


        {/* User Statistics */}

        <div className="chart-box skeleton-chart-box">

          <div className="skeleton skeleton-chart-title"></div>

          <div className="skeleton-user-chart">

            <div className="skeleton skeleton-circle"></div>

            <div className="skeleton-user-lines">

              <div className="skeleton skeleton-user-line"></div>

              <div className="skeleton skeleton-user-line"></div>

              <div className="skeleton skeleton-user-line"></div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


  // =========================
  // UI
  // =========================

  return (

    <div className="admin-page">

      {/* ================= CARDS ================= */}

      <div className="card-griidd">

        {cards.map((card, index) => (

          <div
            key={index}
            className={`bg-gradient-to-r ${card.gradient} dashboard-card`}
          >

            <div>

              <p>{card.title}</p>

              <h2>
                {card.count}
              </h2>

              <span>
                {card.subtitle}
              </span>

            </div>

            <div className="card-icon">
              {card.icon}
            </div>

          </div>

        ))}

      </div>


      {/* ================= CHARTS ================= */}

      <div className="chart-griidd">


        {/* ================= SUCCESS LEADS CHART ================= */}

        <div className="chart-boox">

          <h2>
            Monthly Success Leads
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <LineChart
              data={monthlySuccessData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
              />

              <YAxis
                allowDecimals={false}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="success"
                stroke="#2563EB"
                strokeWidth={4}
                dot={{
                  r: 4,
                }}
                activeDot={{
                  r: 7,
                }}
                isAnimationActive={true}
                animationDuration={800}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>


        {/* ================= USER STATISTICS ================= */}

        <div className="chart-box">

          <h2>
            User Statistics
          </h2>

          <div
            style={{
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >

          </div>

        </div>

      </div>

    </div>

  );
};

export default AdminPage;