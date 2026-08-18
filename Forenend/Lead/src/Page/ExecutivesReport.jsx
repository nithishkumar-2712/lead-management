import React from 'react'
import "./ExecutivesReport.css";
 function ExecutivesReport() {
  return (
    <>
        <div className="log-container">

        <div className="log-header">
            <h2>User Activity Log</h2>

            <div className="table-controls">

            <div className="entries">
                <label>Show</label>
                <select>
                <option>10</option>
                <option>25</option>
                <option>50</option>
                </select>
            </div>

            <div className="search-box">
                <input
                type="text"
                placeholder="Search User / Customer"
                />
            </div>

            </div>
        </div>

        <div className="table-wrapper">

            <table className="modern-table">

            <thead>
                <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>Customer ID</th>
                <th>Action</th>
                <th>IP Address</th>
                <th>Date</th>
                </tr>
            </thead>

            <tbody>

                <tr>
                <td>1</td>
                <td>Anupriya</td>
                <td>1627999</td>
                <td>Call Status Updated - Solved</td>
                <td>49.37.193.242</td>
                <td>02-01-2026</td>
                </tr>

            </tbody>

            </table>

        </div>

        <div className="pagination">

            <button>Previous</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>Next</button>

        </div>

        </div>
    </>
  )
}
export default ExecutivesReport