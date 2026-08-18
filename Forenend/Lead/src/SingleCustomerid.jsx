import React from "react";
import "./SingleCustomerid.css";

const SingleCustomerid = () => {
  const onlineHistory = [
    {
      token: "10516",
      date: "23-06-2026",
      remarks: "General Doubts",
      status: "Solved",
      followedBy: "ANUPRIYA",
    },
    {
      token: "10410",
      date: "20-06-2026",
      remarks: "General Doubts",
      status: "Solved",
      followedBy: "JERINA",
    },
  ];

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="header">
        <h1>Customer Support Dashboard</h1>
      </div>

      {/* Customer Info */}
      <div className="card">
        <div className="card-title">Customer Information</div>

        <div className="customer-grid">
          <div>
            <label>Customer ID</label>
            <p>1579202</p>
          </div>

          <div>
            <label>Business Name</label>
            <p>BLESSING SURGICALS</p>
          </div>

          <div>
            <label>City</label>
            <p>KANYAKUMARI</p>
          </div>

          <div>
            <label>Mobile</label>
            <p>9629058804</p>
          </div>

          <div>
            <label>AMC Due Date</label>
            <p>15-12-2026</p>
          </div>

          <div>
            <label>Status</label>
            <span className="badge success">AMC Active</span>
          </div>
        </div>
      </div>

      {/* Service Form */}
      <div className="card">
        <div className="card-title">Service Entry</div>

        <div className="form-grid">
          <select>
            <option>Mode Of Service</option>
          </select>

          <select>
            <option>Branch</option>
          </select>

          <select>
            <option>Call Status</option>
          </select>

          <input type="text" placeholder="Contact Person" />

          <input type="text" placeholder="Contact Number" />

          <input type="date" />

          <select>
            <option>Assigned To</option>
          </select>

          <textarea
            rows="4"
            placeholder="Engineer Remarks"
          ></textarea>
        </div>

        <div className="btn-group">
          <button className="save-btn">
            Save Call Status
          </button>

          <button className="close-btn">
            Close Ticket
          </button>
        </div>
      </div>

      {/* History Tables */}
      <div className="history-grid">
        <div className="card">
          <div className="card-title">
            Online Call History
          </div>

          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Date</th>
                <th>Remarks</th>
                <th>Status</th>
                <th>Followed By</th>
              </tr>
            </thead>

            <tbody>
              {onlineHistory.map((item, index) => (
                <tr key={index}>
                  <td>{item.token}</td>
                  <td>{item.date}</td>
                  <td>{item.remarks}</td>
                  <td>
                    <span className="badge success">
                      {item.status}
                    </span>
                  </td>
                  <td>{item.followedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-title">
            Direct Visit History
          </div>

          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Date</th>
                <th>Remarks</th>
                <th>Status</th>
                <th>Followed By</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>6958</td>
                <td>14-05-2023</td>
                <td>General Doubts</td>
                <td>
                  <span className="badge success">
                    Solved
                  </span>
                </td>
                <td>BALA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SingleCustomerid;