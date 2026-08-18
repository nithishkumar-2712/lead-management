import React, { useState } from "react";
import "./Creatstatus.css";
import "./LeadManagement.css";
import Customhook from "../components/Customhook";
import axios from "../Config/axios";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

function LeadManagement() {
  const {
    Data: Leadget,
    Loading: LeadLoading,
    CustomHook,
  } = Customhook("/api/leadget");

  // console.log("Lead Data:", Leadget);

  // ==========================================
  // STATES
  // ==========================================

  const [viewLead, setViewLead] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const [searchText, setSearchText] = useState("");

  // ==========================================
  // VIEW LEAD
  // ==========================================

  const handleEview = (item) => {
    setViewLead(item);
    setShowViewModal(true);
  };

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const handleCloseModal = () => {
    setViewLead(null);
    setShowViewModal(false);
  };

  // ==========================================
  // ACTIVATE / DEACTIVATE LEAD
  // ==========================================

  const handleDelete = async (id, isDeleted) => {
    const result = await Swal.fire({
      title: isDeleted
        ? "Activate Lead?"
        : "Deactivate Lead?",

      text: isDeleted
        ? "Do you want to activate this Lead?"
        : "Do you want to deactivate this Lead?",

      icon: "question",

      showCancelButton: true,

      confirmButtonColor: "#2563EB",

      cancelButtonColor: "#DC2626",

      confirmButtonText: "Yes",

      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const { data } = await axios.put(
        `/api/leaddelete/${id}`,
        {
          isActive: !isDeleted,
        }
      );

      if (data.success) {
        await Swal.fire({
          icon: "success",

          title: "Success",

          text: data.message,

          confirmButtonColor: "#2563EB",

          timer: 2000,

          showConfirmButton: false,
        });

        CustomHook();
      } else {
        Swal.fire({
          icon: "warning",

          title: "Failed",

          text: data.message,

          confirmButtonColor: "#F59E0B",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",

        title: "Error",

        text:
          error.response?.data?.message ||
          "Something went wrong",

        confirmButtonColor: "#DC2626",
      });
    }
  };

  // ==========================================
  // SEARCH FILTER
  // ONLY ONE filteredData
  // ==========================================

  const filteredData = (Leadget || []).filter((item) => {
    const search = searchText.trim().toLowerCase();

    // Search empty
    if (!search) {
      return true;
    }

    return (
      String(item?.contactPerson || "")
        .toLowerCase()
        .includes(search) ||

      String(item?.companyName || "")
        .toLowerCase()
        .includes(search) ||

      String(item?.mobile || "")
        .toLowerCase()
        .includes(search) ||

      String(item?.contactNo || "")
        .toLowerCase()
        .includes(search) ||

      String(item?.emailId || "")
        .toLowerCase()
        .includes(search) ||

      String(item?.city || "")
        .toLowerCase()
        .includes(search) ||

      String(item?.assignedUser?.username || "")
        .toLowerCase()
        .includes(search) ||

      String(item?.status?.name || "")
        .toLowerCase()
        .includes(search) ||

      String(item?.assignBranch?.branchName || "")
        .toLowerCase()
        .includes(search) ||

      String(item?.assignBranchHead?.username || "")
        .toLowerCase()
        .includes(search) ||

      String(item?.assignedExecutive?.username || "")
        .toLowerCase()
        .includes(search) ||

      String(item?.priority || "")
        .toLowerCase()
        .includes(search)
    );
  });

  // ==========================================
  // DATATABLE COLUMNS
  // ==========================================

  const columns = [
    // S.NO
    {
      name: "S.No",

      selector: (row, index) => index + 1,

      width: "70px",

      center: true,
    },

    // VIEW
    {
      name: "View",

      width: "90px",

      center: true,

      cell: (row) => (
        <button
          className="edit-btn"
          onClick={() => handleEview(row)}
        >
          View
        </button>
      ),
    },

    // ACTION
    {
      name: "Action",

      width: "125px",

      center: true,

      cell: (row) => (
        <button
          className="delete-btn"
          onClick={() =>
            handleDelete(
              row._id,
              row.isActive
            )
          }
        >
          {row.isActive
            ? "Deactivate"
            : "Activate"}
        </button>
      ),
    },

    // ACTIVE STATUS
    {
      name: "Active Status",

      width: "120px",

      center: true,

      cell: (row) => (
        <span
          className={
            row.isActive
              ? "activvee"
              : "inactivvee"
          }
        >
          {row.isActive
            ? "Active"
            : "Inactive"}
        </span>
      ),
    },

    // CUSTOMER NAME
    {
      name: "C-Name",

      selector: (row) =>
        row?.contactPerson ?? "-",

      sortable: true,

      minWidth: "160px",
    },

    // COMPANY NAME
    {
      name: "Com-Name",

      selector: (row) =>
        row?.companyName ?? "-",

      sortable: true,

      minWidth: "180px",
    },

    // MOBILE
    {
      name: "Mobile",

      selector: (row) =>
        row?.mobile ?? "-",

      sortable: true,

      minWidth: "140px",
    },

    // CITY
    {
      name: "City",

      selector: (row) =>
        row?.city ?? "-",

      sortable: true,

      minWidth: "130px",
    },

    // ASSIGNED USER
    {
      name: "Assigned User",

      selector: (row) =>
        row?.assignedUser?.username ?? "-",

      sortable: true,

      minWidth: "160px",
    },

    // LEAD STATUS
    {
      name: "Status",

      selector: (row) =>
        row?.status?.name ?? "-",

      sortable: true,

      minWidth: "140px",
    },

    // BRANCH
    {
      name: "Branch",

      selector: (row) =>
        row?.assignBranch?.branchName ?? "-",

      sortable: true,

      minWidth: "140px",
    },

    // BRANCH HEAD
    {
      name: "Branch Head",

      selector: (row) =>
        row?.assignBranchHead?.username ?? "-",

      sortable: true,

      minWidth: "160px",
    },

    // EXECUTIVE
    {
      name: "Executive",

      selector: (row) =>
        row?.assignedExecutive?.username ?? "-",

      sortable: true,

      minWidth: "160px",
    },

    // CREATED
    {
      name: "Created",

      selector: (row) =>
        row?.createdAt
          ? row.createdAt.substring(0, 10)
          : "-",

      sortable: true,

      minWidth: "120px",
    },

    // PRIORITY
    {
      name: "Priority",

      selector: (row) =>
        row?.priority ?? "-",

      sortable: true,

      minWidth: "120px",
    },
  ];

  // ==========================================
  // DATATABLE CUSTOM STYLE
  // ==========================================

  const customStyles = {
    table: {
      style: {
        width: "100%",
      },
    },

    tableWrapper: {
      style: {
        display: "table",
        width: "100%",
      },
    },

    headRow: {
      style: {
        backgroundColor: "#2563EB",
        color: "#ffffff",
        fontSize: "14px",
        fontWeight: "600",
        minHeight: "52px",
      },
    },

    headCells: {
      style: {
        paddingLeft: "12px",
        paddingRight: "12px",
        whiteSpace: "nowrap",
      },
    },

    rows: {
      style: {
        minHeight: "58px",
        fontSize: "14px",
        backgroundColor: "#ffffff",
      },

      highlightOnHoverStyle: {
        backgroundColor: "#f8fafc",
        borderBottomColor: "#e5e7eb",
        outline: "none",
        cursor: "pointer",
      },
    },

    cells: {
      style: {
        paddingLeft: "12px",
        paddingRight: "12px",
        whiteSpace: "nowrap",
      },
    },

    pagination: {
      style: {
        borderTop: "1px solid #e5e7eb",
        minHeight: "56px",
        paddingLeft: "10px",
        paddingRight: "10px",
      },

      pageButtonsStyle: {
        borderRadius: "6px",
        height: "32px",
        width: "32px",
        padding: "4px",
        margin: "2px",
        cursor: "pointer",
      },
    },
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (LeadLoading) {
    return (
      <div className="users-page">

        <div className="users-header">
          <div className="sk-title"></div>
        </div>

        <div className="users-skeleton-table">

          {[...Array(6)].map((_, i) => (
            <div
              className="sk-row"
              key={i}
            >

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

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <>
      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="table-header body">

        <h2>
          Lead Management
        </h2>

      </div>

      {/* ======================================
          DATATABLE CONTAINER
      ====================================== */}

      <div className="table-container lead-datatable">

        {/* ==================================
            SEARCH SECTION
        ================================== */}

        <div className="lead-search-section">

          {/* LEFT */}

          <div className="lead-search-left">

            <h3>
              Lead List
            </h3>

            <span className="lead-count">
              Total: {filteredData.length}
            </span>

          </div>

          {/* RIGHT */}

          <div className="lead-search-right">

            <div className="lead-search-box">

              <span className="search-icon">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search Lead..."
                value={searchText}
                onChange={(e) =>
                  setSearchText(
                    e.target.value
                  )
                }
              />

              {searchText && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() =>
                    setSearchText("")
                  }
                >
                  ✕
                </button>
              )}

            </div>

          </div>

        </div>

        {/* ==================================
            DATA TABLE
        ================================== */}

        <DataTable
          columns={columns}

          data={filteredData}

          customStyles={customStyles}

          responsive

          highlightOnHover

          pointerOnHover

          pagination

          paginationPerPage={10}

          paginationRowsPerPageOptions={[
            10,
            20,
            30,
            50,
            100,
          ]}

          paginationComponentOptions={{
            rowsPerPageText:
              "Rows per page:",

            rangeSeparatorText: "of",

            noRowsPerPage: false,

            selectAllRowsItem: false,
          }}

          noDataComponent={
            <div className="lead-no-data">

              <div className="lead-no-data-icon">
                📋
              </div>

              <h3>
                {searchText
                  ? "No Matching Leads"
                  : "No Leads Found"}
              </h3>

              <p>
                {searchText
                  ? `No lead found for "${searchText}"`
                  : "No lead data available at the moment."}
              </p>

            </div>
          }
        />

      </div>

      {/* ======================================
          VIEW LEAD MODAL
      ====================================== */}

      {showViewModal && viewLead && (
        <div className="leadview-overlay">

          <div className="leadview-modal">

            {/* HEADER */}

            <div className="leadview-header">

              <h2>
                Lead Details
              </h2>

              <button
                className="leadview-close-btn"
                onClick={
                  handleCloseModal
                }
              >
                ✕
              </button>

            </div>

            {/* BODY */}

            <div className="leadview-body">

              {/* CUSTOMER DETAILS */}

              <div className="leadview-card">

                <h3>
                  Customer Details
                </h3>

                <div className="leadview-grid">

                  <div>
                    <strong>
                      Customer ID
                    </strong>

                    <span>
                      {viewLead?._id ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Contact Person
                    </strong>

                    <span>
                      {viewLead?.contactPerson ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Company
                    </strong>

                    <span>
                      {viewLead?.companyName ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Mobile
                    </strong>

                    <span>
                      {viewLead?.mobile ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Contact No
                    </strong>

                    <span>
                      {viewLead?.contactNo ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Email
                    </strong>

                    <span>
                      {viewLead?.emailId ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Address
                    </strong>

                    <span>
                      {viewLead?.address ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      City
                    </strong>

                    <span>
                      {viewLead?.city ||
                        "N/A"}
                    </span>
                  </div>

                </div>

              </div>

              {/* LEAD INFORMATION */}

              <div className="leadview-card">

                <h3>
                  Lead Information
                </h3>

                <div className="leadview-grid">

                  <div>
                    <strong>
                      Status
                    </strong>

                    <span>
                      {viewLead?.status?.name ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Priority
                    </strong>

                    <span>
                      {viewLead?.priority ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Lead Source
                    </strong>

                    <span>
                      {viewLead?.leadSource?.name ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Business
                    </strong>

                    <span>
                      {viewLead?.businessType?.name ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Software
                    </strong>

                    <span>
                      {viewLead?.Software ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Reference
                    </strong>

                    <span>
                      {viewLead?.referenceDetails ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Reason Reject
                    </strong>

                    <span>
                      {viewLead?.reasonReject ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Active Status
                    </strong>

                    <span>
                      {viewLead?.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>

                </div>

              </div>

              {/* ASSIGNMENT DETAILS */}

              <div className="leadview-card">

                <h3>
                  Assignment Details
                </h3>

                <div className="leadview-grid">

                  <div>
                    <strong>
                      Branch
                    </strong>

                    <span>
                      {viewLead
                        ?.assignBranch
                        ?.branchName ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Branch Head
                    </strong>

                    <span>
                      {viewLead
                        ?.assignBranchHead
                        ?.username ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Executive
                    </strong>

                    <span>
                      {viewLead
                        ?.assignedExecutive
                        ?.username ||
                        "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Assigned User
                    </strong>

                    <span>
                      {viewLead
                        ?.assignedUser
                        ?.username ||
                        "N/A"}
                    </span>
                  </div>

                </div>

              </div>

              {/* DATE DETAILS */}

              <div className="leadview-card">

                <h3>
                  Date Details
                </h3>

                <div className="leadview-grid">

                  <div>
                    <strong>
                      Demo Date
                    </strong>

                    <span>
                      {viewLead?.demoDate
                        ? viewLead.demoDate.substring(
                            0,
                            10
                          )
                        : "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Created
                    </strong>

                    <span>
                      {viewLead?.createdAt
                        ? viewLead.createdAt.substring(
                            0,
                            10
                          )
                        : "N/A"}
                    </span>
                  </div>

                  <div>
                    <strong>
                      Updated
                    </strong>

                    <span>
                      {viewLead?.updatedAt
                        ? viewLead.updatedAt.substring(
                            0,
                            10
                          )
                        : "N/A"}
                    </span>
                  </div>

                </div>

              </div>

              {/* REMARKS */}

              <div className="leadview-card">

                <h3>
                  Remarks
                </h3>

                <div className="leadview-remarks">

                  {viewLead?.remarks ||
                    "N/A"}

                </div>

              </div>

            </div>

            {/* FOOTER */}

            <div className="leadview-footer">

              <button
                className="leadview-cancel-btn"
                onClick={
                  handleCloseModal
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </>
  );
}

export default LeadManagement;