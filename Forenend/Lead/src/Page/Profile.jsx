import React from "react";
import "./profile.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Customhook from "../components/Customhook";

function Profile() {
  const { id } = useParams();
  // console.log(id);
  const location = useLocation();
  const Profile = location.state?.Profileid;
    if (!Profile) {
    return <div>Profile data not found</div>;
  }
  // console.log(Profile);

  // const [loading, setLoading] = useState(true);
// if (!loading) {
//   return (
//     <div className="profile-containerr">

//       <div className="profile-left">
//         <Skeleton circle width={120} height={120} />
//         <Skeleton height={30} width={180} style={{ marginTop: 20 }} />
//         <Skeleton height={20} width={220} style={{ marginTop: 10 }} />
//         <Skeleton height={35} width={120} style={{ marginTop: 20 }} />
//         <Skeleton height={45} width={160} style={{ marginTop: 20 }} />
//       </div>

//       <div className="profile-right">
//         <Skeleton height={35} width={200} />

//         {[...Array(6)].map((_, index) => (
//           <div className="info-box" key={index}>
//             <Skeleton height={18} width={120} />
//             <Skeleton
//               height={25}
//               width="80%"
//               style={{ marginTop: 8 }}
//             />
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }

  return (
    <>
        <div className="profile-containerr">
        {/* Left Side */}

        <div className="profile-left">
            <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="User"
            className="user-img"
            />

            <h2>{Profile.username}</h2>

            <p>{Profile?.Email || "jjenterprice@email.com"}</p>
            
            <div className="user-badge">
            {Profile.userType.roleName}
            </div>
        </div>

        {/* Right Side */}

        <div className="profile-right">
            <h2>User Details</h2>


            <div className="info-box">
            <span>Username</span>
            <p>{Profile.username}</p>
            </div>

            <div className="info-box">
            <span>Email Name</span>
            <p>{Profile?.Email || "jjenterprice@email.com"}</p>
            </div>

            <div className="info-box">
            <span>Branch</span>
            <p>{Profile.branch.branchName}</p>
            </div>

            <div className="info-box">
            <span>Phone Number</span>
            <p>{Profile.Number || "8925196712"}</p>
            </div>

            <div className="info-box">
            <span>User Role</span>
            <p>{Profile.userType.roleName}</p>
            </div>

            <div className="info-box">
            <span>Status</span>
            <p style={{ color: "#22c55e" }}>
                {Profile.isBlocked==="true"?"Active":"InActive"}
            </p>
            </div>
        </div>
        </div>
    </>
  );
}

export default Profile;