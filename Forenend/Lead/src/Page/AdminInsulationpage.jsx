import React, { useState } from "react";
import "./Creatstatus.css";
import "./LeadManagement.css";
import Customhook from "../components/Customhook";
import axios from "../Config/axios";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";

function AdminInsulationpage() {
  const {
    Data: Leadget,
    Loading: LeadLoading,
    CustomHook,
  } = Customhook("/api/Allinsulatrion");

  const [viewLead, setViewLead] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  // ==========================================
  // VIEW INSTALLATION
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
  // ACTIVATE / DEACTIVATE
  // ==========================================

  const handleDelete = async (id, isDeleted) => {
    console.log(id, isDeleted);

    const result = await Swal.fire({
      title: isDeleted
        ? "Activate Installation?"
        : "Deactivate Installation?",

      text: isDeleted
        ? "Do you want to activate this Installation?"
        : "Do you want to deactivate this Installation?",

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
        `/api/Licencedelete/${id}`,
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
  // ==========================================

  const search = searchText.trim().toLowerCase();

  const filteredData = (Leadget || []).filter((item) => {
    if (!search) return true;

    const searchableData = [
      item?.softwareName,
      item?.licenseId,

      item?.installationDate,

      item?.leadId?.companyName,
      item?.leadId?.contactNo,
      item?.leadId?.mobile,
      item?.leadId?.contactPerson,
      item?.leadId?.emailId,
      item?.leadId?.city,

      item?.leadId?.assignedUser?.username,
      item?.leadId?.assignBranchHead?.username,
      item?.leadId?.assignedExecutive?.username,
      item?.leadId?.assignBranch?.branchName,

      item?.leadId?.status?.name,
      item?.leadId?.priority,

      item?.leadId?.remarks,
    ];

    return searchableData.some((value) =>
      String(value ?? "")
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

      width: "120px",

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

    // SOFTWARE
    {
      name: "Software",

      selector: (row) =>
        row?.softwareName ?? "-",

      sortable: true,

      minWidth: "150px",
    },

    // LICENSE ID
    {
      name: "License ID",

      selector: (row) =>
        row?.licenseId ?? "-",

      sortable: true,

      minWidth: "180px",
    },

    // INSTALLATION DATE
    {
      name: "Installation Date",

      selector: (row) =>
        row?.installationDate
          ? row.installationDate.substring(
              0,
              10
            )
          : "-",

      sortable: true,

      minWidth: "150px",
    },

    // COMPANY
    {
      name: "Company",

      selector: (row) =>
        row?.leadId?.companyName ?? "-",

      sortable: true,

      minWidth: "180px",
    },

    // CONTACT
    {
      name: "Contact No",

      selector: (row) =>
        row?.leadId?.contactNo ?? "-",

      minWidth: "140px",
    },

    // MOBILE
    {
      name: "Mobile",

      selector: (row) =>
        row?.leadId?.mobile ?? "-",

      minWidth: "140px",
    },

    // CONTACT PERSON
    {
      name: "Contact Person",

      selector: (row) =>
        row?.leadId?.contactPerson ?? "-",

      sortable: true,

      minWidth: "160px",
    },

    // CITY
    {
      name: "City",

      selector: (row) =>
        row?.leadId?.city ?? "-",

      sortable: true,

      minWidth: "130px",
    },

    // ASSIGNED USER
    {
      name: "Assigned User",

      selector: (row) =>
        row?.leadId?.assignedUser
          ?.username ?? "-",

      sortable: true,

      minWidth: "160px",
    },

    // BRANCH HEAD
    {
      name: "Branch Head",

      selector: (row) =>
        row?.leadId?.assignBranchHead
          ?.username ?? "-",

      sortable: true,

      minWidth: "160px",
    },

    // INSTALLED BY
    {
      name: "Installed By",

      selector: (row) =>
        row?.leadId?.assignedExecutive
          ?.username ?? "-",

      sortable: true,

      minWidth: "160px",
    },

    // BRANCH
    {
      name: "Branch",

      selector: (row) =>
        row?.leadId?.assignBranch
          ?.branchName ?? "-",

      sortable: true,

      minWidth: "140px",
    },

    // LEAD STATUS
    {
      name: "Lead Status",

      selector: (row) =>
        row?.leadId?.status?.name ?? "-",

      sortable: true,

      minWidth: "140px",
    },

    // PRIORITY
    {
      name: "Priority",

      selector: (row) =>
        row?.leadId?.priority ?? "-",

      sortable: true,

      minWidth: "120px",
    },
  ];

  // ==========================================
  // DATATABLE STYLE
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
        borderTop:
          "1px solid #e5e7eb",

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
      {/* PAGE HEADER */}

      <div className="table-header body">

        <h2>
          Installation Management
        </h2>

      </div>

      {/* DATATABLE */}

      <div className="table-container insulation-datatable">

        {/* ======================================
            SEARCH HEADER
        ====================================== */}

        <div className="lead-search-section">

          <div className="lead-search-left">

            <h3>
              Installation List
            </h3>

            <span className="lead-count">
              Total: {filteredData.length}
            </span>

          </div>

          <div className="lead-search-right">

            <div className="lead-search-box">

              <span className="search-icon">
                🔍
              </span>

              <input
                type="text"

                value={searchText}

                onChange={(e) =>
                  setSearchText(
                    e.target.value
                  )
                }

                placeholder="Search Installation..."
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

        {/* ======================================
            DATATABLE
        ====================================== */}

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

            rangeSeparatorText:
              "of",

            noRowsPerPage: false,

            selectAllRowsItem: false,
          }}

          sortIcon={
            <span
              style={{
                fontSize: "15px",
              }}
            >
              ↕
            </span>
          }

          noDataComponent={
            <div className="no-data">

              <div className="no-data-icon">
                📋
              </div>

              <h3>
                No Installation Found
              </h3>

              <p>
                {searchText
                  ? `No installation found for "${searchText}"`
                  : "There are no Installation available."}
              </p>

            </div>
          }
        />

      </div>

      {/* ==========================================
          VIEW MODAL
      ========================================== */}

      {showViewModal &&
        viewLead && (

          <div className="leadview-overlay">

            <div className="leadview-modal">

              {/* HEADER */}

              <div className="leadview-header">

                <h2>
                  Installation Details
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
                        {viewLead?.leadId
                          ?.contactPerson ||
                          "N/A"}
                      </span>
                    </div>

                    <div>
                      <strong>
                        Company
                      </strong>

                      <span>
                        {viewLead?.leadId
                          ?.companyName ||
                          "N/A"}
                      </span>
                    </div>

                    <div>
                      <strong>
                        Mobile
                      </strong>

                      <span>
                        {viewLead?.leadId
                          ?.mobile ||
                          "N/A"}
                      </span>
                    </div>

                    <div>
                      <strong>
                        Contact No
                      </strong>

                      <span>
                        {viewLead?.leadId
                          ?.contactNo ||
                          "N/A"}
                      </span>
                    </div>

                    <div>
                      <strong>
                        Email
                      </strong>

                      <span>
                        {viewLead?.leadId
                          ?.emailId ||
                          "N/A"}
                      </span>
                    </div>

                    <div>
                      <strong>
                        Address
                      </strong>

                      <span>
                        {viewLead?.leadId
                          ?.address ||
                          "N/A"}
                      </span>
                    </div>

                    <div>
                      <strong>
                        City
                      </strong>

                      <span>
                        {viewLead?.leadId
                          ?.city ||
                          "N/A"}
                      </span>
                    </div>

                  </div>

                </div>

                {/* INSTALLATION INFORMATION */}

                <div className="leadview-card">

                  <h3>
                    Installation Information
                  </h3>

                  <div className="leadview-grid">

                    <div>
                      <strong>
                        License ID
                      </strong>

                      <span>
                        {viewLead?.licenseId ||
                          "N/A"}
                      </span>
                    </div>

                    <div>
                      <strong>
                        Software
                      </strong>

                      <span>
                        {viewLead?.softwareName ||
                          "N/A"}
                      </span>
                    </div>

                    <div>
                      <strong>
                        Installation Status
                      </strong>

                      <span>
                        {viewLead?.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </div>

                    <div>
                      <strong>
                        Lead Status
                      </strong>

                      <span>
                        {viewLead?.leadId
                          ?.status?.name ||
                          "N/A"}
                      </span>
                    </div>

                    <div>
                      <strong>
                        Priority
                      </strong>

                      <span>
                        {viewLead?.leadId
                          ?.priority ||
                          "N/A"}
                      </span>
                    </div>

                    <div>
                      <strong>
                        City
                      </strong>

                      <span>
                        {viewLead?.leadId
                          ?.city ||
                          "N/A"}
                      </span>
                    </div>

                    <div>
                      <strong>
                        Reference Details
                      </strong>

                      <span>
                        {viewLead?.leadId
                          ?.referenceDetails ||
                          "N/A"}
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
                        {viewLead?.leadId
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
                        {viewLead?.leadId
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
                        {viewLead?.leadId
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
                        {viewLead?.leadId
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
                        Installation Date
                      </strong>

                      <span>
                        {viewLead
                          ?.installationDate
                          ? viewLead.installationDate.substring(
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

                    {viewLead?.leadId
                      ?.remarks ||
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

export default AdminInsulationpage;