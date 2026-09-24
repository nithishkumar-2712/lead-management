// const nodemailer = require("nodemailer");
// require("dotenv").config();
// const sendLeadAssignedEmail = async ({
//   email,
//   companyName,
//   contactPerson,
//   contactNo,
//   branchName,
// }) => {
//   try {
//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false,
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS,
//         },
//     });

// const leadUrl = process.env.Backend_url;

// await transporter.sendMail({
//   from: `"JJ Enterprises - Madurai Head Office" <${process.env.EMAIL_USER}>`,
//   to: email,

//   subject: `New Lead Assigned from Madurai Head Office - ${companyName}`,

//   html: `
//     <div style="
//       margin:0;
//       padding:20px 10px;
//       background:#f1f5f9;
//       font-family:Arial, Helvetica, sans-serif;
//     ">

//       <div style="
//         max-width:600px;
//         margin:auto;
//         background:#ffffff;
//         border-radius:8px;
//         overflow:hidden;
//         box-shadow:0 2px 8px rgba(0,0,0,0.06);
//       ">

//         <!-- Header -->
//         <div style="
//           background:#2563EB;
//           padding:18px 15px;
//           text-align:center;
//         ">

//           <h1 style="
//             margin:0;
//             color:#ffffff;
//             font-size:20px;
//             line-height:1.3;
//           ">
//             JJ Enterprises
//           </h1>

//           <p style="
//             margin:5px 0 0;
//             color:#dbeafe;
//             font-size:12px;
//             line-height:1.4;
//           ">
//             Madurai Head Office
//           </p>

//         </div>


//         <!-- Content -->
//         <div style="
//           padding:22px 18px;
//         ">

//           <h2 style="
//             margin:0 0 15px;
//             color:#1e293b;
//             font-size:18px;
//             line-height:1.4;
//           ">
//             New Lead Assigned
//           </h2>


//           <p style="
//             margin:0 0 10px;
//             color:#475569;
//             font-size:14px;
//             line-height:1.6;
//           ">
//             Hello Branch Head,
//           </p>


//           <p style="
//             margin:0 0 18px;
//             color:#475569;
//             font-size:14px;
//             line-height:1.6;
//           ">
//             A new lead has been assigned to your branch
//             by the <strong>Madurai Head Office</strong>.
//           </p>


//           <!-- Lead Details -->
//           <div style="
//             margin-top:15px;
//             border:1px solid #e2e8f0;
//             border-radius:6px;
//             overflow:hidden;
//           ">

//             <div style="
//               background:#f8fafc;
//               padding:11px 14px;
//               border-bottom:1px solid #e2e8f0;
//             ">
//               <strong style="
//                 color:#1e293b;
//                 font-size:14px;
//               ">
//                 Lead Details
//               </strong>
//             </div>


//             <div style="
//               padding:14px;
//             ">

//               <p style="
//                 margin:7px 0;
//                 color:#334155;
//                 font-size:13px;
//                 line-height:1.5;
//               ">
//                 <strong>Company Name:</strong>
//                 ${companyName || "N/A"}
//               </p>


//               <p style="
//                 margin:7px 0;
//                 color:#334155;
//                 font-size:13px;
//                 line-height:1.5;
//               ">
//                 <strong>Contact Person:</strong>
//                 ${contactPerson || "N/A"}
//               </p>


//               <p style="
//                 margin:7px 0;
//                 color:#334155;
//                 font-size:13px;
//                 line-height:1.5;
//               ">
//                 <strong>Contact Number:</strong>
//                 ${contactNo || "N/A"}
//               </p>


//               <p style="
//                 margin:7px 0;
//                 color:#334155;
//                 font-size:13px;
//                 line-height:1.5;
//               ">
//                 <strong>Assigned Branch:</strong>
//                 ${branchName || "N/A"}
//               </p>


//               <p style="
//                 margin:7px 0;
//                 color:#334155;
//                 font-size:13px;
//                 line-height:1.5;
//               ">
//                 <strong>Source:</strong>
//                 Madurai Head Office
//               </p>

//             </div>
//           </div>


//           <!-- View Lead Button -->
//           <div style="
//             text-align:center;
//             margin-top:22px;
//           ">

//             <a
//               href="${leadUrl}"
//               target="_blank"
//               style="
//                 display:inline-block;
//                 padding:11px 22px;
//                 background:#2563EB;
//                 color:#ffffff;
//                 text-decoration:none;
//                 border-radius:5px;
//                 font-size:14px;
//                 font-weight:bold;
//               "
//             >
//               View Lead
//             </a>

//           </div>


//           <p style="
//             margin:15px 0 0;
//             color:#64748b;
//             font-size:12px;
//             line-height:1.5;
//             text-align:center;
//           ">
//             Click the button above to view the assigned lead.
//           </p>


//           <!-- Regards -->
//           <p style="
//             margin:22px 0 0;
//             color:#475569;
//             font-size:13px;
//             line-height:1.6;
//           ">
//             Regards,<br/>
//             <strong>JJ Enterprises</strong><br/>
//             Madurai Head Office
//           </p>

//         </div>


//         <!-- Footer -->
//         <div style="
//           background:#f8fafc;
//           padding:12px 10px;
//           text-align:center;
//           border-top:1px solid #e2e8f0;
//         ">

//           <p style="
//             margin:0;
//             color:#94a3b8;
//             font-size:10px;
//             line-height:1.5;
//           ">
//             This is an automated notification from
//             JJ Enterprises Lead Management System.
//           </p>

//         </div>

//       </div>

//     </div>
//   `,
// });

//     console.log("✅ Lead assignment email sent:", email);

//   } catch (error) {
//     console.error("❌ Email sending error:", error);
//   }
// };

// module.exports = {
//   sendLeadAssignedEmail,
// };