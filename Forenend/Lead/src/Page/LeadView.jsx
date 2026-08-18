import React from "react";
import "./LeadView.css";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LeadView = () => {
  const { state } = useLocation();
  // console.log(state)

  // Branch assigned or not 
  const isAssigned = !!state?.assignBranch;
  const loading = !state;
  if (loading) {
  return (
    <div className="leadview-loading">

      <Skeleton height={40} width={280} />

      {[1, 2, 3].map((card) => (
        <div className="loading-card" key={card}>

          <Skeleton
            height={35}
            width={220}
            style={{ marginBottom: 25 }}
          />

          <div className="loading-grid">
            {[...Array(8)].map((_, index) => (
              <div className="loading-item" key={index}>
                <Skeleton height={18} width={100} />
                <Skeleton
                  height={35}
                  style={{ marginTop: 10 }}
                />
              </div>
            ))}
          </div>

        </div>
      ))}

    </div>
  );
}

  return (
    <>
      <h2 className="page-title">Lead Details View</h2>

<div className="container">

  {/* Lead Details */}
  <div className="card">
    <div className="card-header">Lead Details</div>

    <div className="card-body">
      <div className="info-grid">

        {state?.status?.name && (
          <Info
            label="Status"
            value={state.status.name}
          />
        )}

        {state?.leadSource?.name && (
          <Info
            label="Lead Source"
            value={state.leadSource.name}
          />
        )}

        {state?.mobile && (
          <Info
            label="Called Number"
            value={state.mobile}
          />
        )}

        {state?.assignedUser?.username && (
          <Info
            label="Tele Caller"
            value={state.assignedUser.username}
          />
        )}

        {state?.referenceDetails && (
          <Info
            label="Software In Use"
            value={state.referenceDetails}
          />
        )}

        {state?.remarks && (
          <Info
            label="Remarks"
            value={state.remarks}
          />
        )}

      </div>
    </div>
  </div>


  {/* Show only after Branch Assigned */}
  {isAssigned && (
    <>

      {/* Client Information */}
      <div className="card">
        <div className="card-header">Client Information</div>

        <div className="card-body">
          <div className="info-grid">

            {state?.contactPerson && (
              <Info
                label="Client Name"
                value={state.contactPerson}
              />
            )}

            {state?.companyName && (
              <Info
                label="Business Name"
                value={state.companyName}
              />
            )}

            {state?.businessType?.name && (
              <Info
                label="Business Type"
                value={state.businessType.name}
              />
            )}

            {state?.contactNo && (
              <Info
                label="Contact Number"
                value={state.contactNo}
              />
            )}

            {state?.alternateContactNo && (
              <Info
                label="Alternate Number"
                value={state.alternateContactNo}
              />
            )}

            {state?.address && (
              <Info
                label="Address"
                value={state.address}
              />
            )}

          </div>
        </div>
      </div>


      {/* Additional Information */}
      <div className="card">
        <div className="card-header">Additional Information</div>

        <div className="card-body">
          <div className="info-grid">

            {state?.district && (
              <Info
                label="District"
                value={state.district}
              />
            )}

            {state?.city && (
              <Info
                label="City"
                value={state.city}
              />
            )}

            {state?.assignBranchHead?.username && (
              <Info
                label="Branch-Head"
                value={state.assignBranchHead.username}
              />
            )}

            {state?.preferredLanguage && (
              <Info
                label="Preferred Language"
                value={state.preferredLanguage}
              />
            )}

            {state?.priority && (
              <Info
                label="Priority"
                value={state.priority}
              />
            )}

            {state?.assignedExecutive?.username && (
              <Info
                label="Executive"
                value={state.assignedExecutive.username}
              />
            )}

            {state?.demoDate && (
              <Info
                label="Demo Date"
                value={new Date(state.demoDate).toLocaleDateString()}
              />
            )}

            {state?.assignBranch?.branchName && (
              <Info
                label="Assigned Branch"
                value={state.assignBranch.branchName}
              />
            )}

          </div>
        </div>
      </div>

    </>
  )}

</div>
    </>
  );
};

const Info = ({ label, value }) => (
  <div className="info-item">
    <div className="label">{label}</div>
    <div className="value">{value || "-"}</div>
  </div>
);

export default LeadView;