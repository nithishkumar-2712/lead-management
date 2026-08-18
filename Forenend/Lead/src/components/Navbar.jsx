import React, { useContext, useState , useEffect, useRef} from "react";
import "./Navbar.css";
import { Link ,useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "../Config/axios";
import Swal from "sweetalert2";
import { AppContext } from "../App";
import socket from "../Config/socket";
// import { useEffect } from "react";
 function Navbar() {
    const [count, setCount] = useState(0);
    // const [notifications, setNotifications] = useState([]);
     const{Role,isLoggedIn,tokencheck}=useContext(AppContext);
    //  console.log(`Token${isLoggedIn}`)
    const navRef = useRef(null);
    const menuBtnRef = useRef(null);
    //  console.log(`Role=${Role}`);
    const [menuOpen, setMenuOpen] = useState(false);
    // const [Profileid, setProfileid] = useState([]);
    // console.log(Profileid)
    const navigate = useNavigate();
    // const [Token, settoken] = useState(true);
    const [profileOpen, setProfileOpen] = useState(false);
     const [showMaster, setShowMaster] = useState(false);
const LogOut = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Logout",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    const { data } = await axios.post("/api/Logout");

    if (data.success) {
      setProfileOpen(false);

      // Auth state update
      await tokencheck();

      // Go to Home
      navigate("/signin", { replace: true });

      // Success message
      Swal.fire({
        title: "Logged Out!",
        text: data.message,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

    } else {
      Swal.fire({
        title: "Error!",
        text: data.message,
        icon: "error",
      });
    }

  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.response?.data?.message || "Logout Failed",
      icon: "error",
    });
  }
};
    const Prfofil = async () => {
    try {
        const { data } = await axios.post("/api/Prfofil");

        if (data.success) {
        setProfileOpen(false);

        const profile = data.data;

        navigate(`/Profile/${profile._id}`, {
            state: { Profileid: profile },
        });

        Swal.fire({
            icon: "success",
            title: "Success",
            text: data.message,
            timer: 1500,
            showConfirmButton: false,
        });
        } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message,
        });
        }
    } catch (error) {
        Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        });
    }
    };
    const closeMenu = () => {
    setMenuOpen(false);
    };
useEffect(() => {

    socket.on("executiveNotification", (data) => {

        console.log("Notification Received", data);
        setCount((prev) => prev + 1);

        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "New Lead Assigned",
            text: data.companyName,
            timer: 3000,
            showConfirmButton: false,
        });

    });

    return () => socket.off("executiveNotification");

}, []);
useEffect(() => {
  const handleOutsideClick = (e) => {
    if (
      menuOpen &&
      navRef.current &&
      !navRef.current.contains(e.target) &&
      menuBtnRef.current &&
      !menuBtnRef.current.contains(e.target)
    ) {
      setMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleOutsideClick);
  document.addEventListener("touchstart", handleOutsideClick);

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
    document.removeEventListener("touchstart", handleOutsideClick);
  };
}, [menuOpen]);
  return (
    <>
        <nav className="navbar" ref={navRef}>
            <div className="logo">
            {/* <i className="fa-solid fa-chart-line"></i> */}
            <span>JJEnterprisess</span>
            </div>

            <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                {!isLoggedIn?(
                <>
                <li><Link to="/Home"onClick={closeMenu}>Home</Link></li>
                <li><Link to="/About"onClick={closeMenu}>About</Link></li>
                <li><Link to="/Services"onClick={closeMenu}>Services</Link></li>
                <li><Link to="/Contact"onClick={closeMenu}>Contact</Link></li>
                
                </>):(<>
                
                {/* Lead */}
                {Role === "Lead" && (
                    <>
                    {/* <li><Link to="/"onClick={closeMenu}>Home</Link></li> */}
                    <li><Link to="/Lead"onClick={closeMenu}>Dashboard</Link></li>
                    <li><Link to="/LeadEdit"onClick={closeMenu}>LeadEdit</Link></li>
                    </>
                )}

                {/* Head */}
                {Role === "Branch Head" && (
                    <>
                    <li><Link to="/BranchHead" onClick={closeMenu}>BranchHead</Link></li>
                    <li><Link to="/OwnLeads" onClick={closeMenu}>OwnLeads</Link></li>
                    <li><Link to="/Executives"onClick={closeMenu}>Executives</Link></li>
                    </>
                )}

                {/* Executive */}
                {Role === "Executives" && (
                    <>
                    <li><Link to="/ExcutiveHomepage"onClick={closeMenu}>Lead Executive</Link></li>
                    <li><Link to="/OwnLeads" onClick={closeMenu}>OwnLeads</Link></li>
                    <li><Link to="/Executives"onClick={closeMenu}>Executives</Link></li>
                    </>
                )}
                {/* Admin */}
                {Role === "Admin" && (
                    <>
                    <ul className="navbar-menu">
                            {/* <li>
                                <Link to="/"onClick={closeMenu}>Home</Link>
                            </li> */}
                            <li>
                                <Link to="/AdminPage"onClick={closeMenu}>Dashboard</Link>
                            </li>
                            <li
                                className="dropdown"
                                onMouseMove={() => setShowMaster(true)}
                                onMouseLeave={() => setShowMaster(false)}
                            >
                                <span className="dropdown-titlte">
                                Master ▼
                                </span>

                                {showMaster && (
                                <ul className="dropdown-menu">
                                    <li><Link to="/UserRole"onClick={closeMenu}>Role</Link></li>
                                    <li><Link to="/BranchCreat"onClick={closeMenu}>Branch</Link></li>
                                    <li><Link to="/Creatstatus"onClick={closeMenu}>Status</Link></li>
                                    <li><Link to="/BusinessType"onClick={closeMenu}>Business</Link></li>
                                    <li><Link to="/Leadsourse"onClick={closeMenu}>Lead Source</Link></li>
                                    <li><Link to="/UsersManagement"onClick={closeMenu}>User</Link></li>
                                    {/* <li><Link to="/LeadManagement"onClick={closeMenu}>Lead</Link></li> */}
                                    {/* <li><Link to="/Excutivecell"onClick={closeMenu}>Cells</Link></li> */}
                                </ul>
                                )}
                            </li>
                            <li>
                                <Link to="/AdminInsulationpage"onClick={closeMenu}>Insulation</Link>
                            </li>
                            <li>
                                <Link to="/LeadManagement"onClick={closeMenu}>Lead</Link>
                            </li>
                    </ul>
                    </>
                )}
                
                </>)}
            </ul>

            <div className="right-menu">
                <div style={{ position: "relative" }}>

                    <i className="fa-regular fa-bell" style={{ fontSize: "22px" }} onClick={() => setCount(0)}></i>

                    {count > 0 && (
                        <span
                            style={{
                                position: "absolute",
                                top: "-8px",
                                right: "-8px",
                                background: "red",
                                color: "white",
                                borderRadius: "50%",
                                width: "18px",
                                height: "18px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "11px",
                                fontWeight: "bold"
                            }}
                        >
                            {count}
                        </span>
                    )}

                </div>
            {/* <i className="fa-solid fa-gear"></i> */}

            <div
                className={`profile-modal ${profileOpen ? "active" : ""}`}
                onClick={() => setProfileOpen(false)}
            >
                <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
                >
                <span
                    className="close-btttnn"
                    onClick={() => setProfileOpen(false)}
                >
                    &times;
                </span>

                <img
                    src="https://i.pravatar.cc/150"
                    alt="Profile"
                />

                <h2>My Profile</h2>
                <p>Welcome Back!</p>

                <div className="modal-buttons">

                 {isLoggedIn ?(
                    <>
                    <button
                        className="view-btn"
                        onClick={Prfofil}
                    >
                        View Profile
                    </button>

                    <button
                        className="logout-btn"
                        onClick={LogOut}
                    >
                        Logout
                    </button>
                    </>
                ) : (
                    <button
                    className="logout-btn"
                    onClick={() => {
                        setProfileOpen(false);
                        navigate("/signin");
                    }}
                    >
                    Login
                    </button>
                )}

                </div>
                </div>
            </div>

            <div
                className="profile"
                onClick={
                    () => {setProfileOpen(true)
                        setMenuOpen(false);}
                }
            >
                <img
                src="https://i.pravatar.cc/150"
                alt="Profile"
                />
            </div>

            <div
            ref={menuBtnRef}
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            >
            <i className="fa-solid fa-bars"></i>
            </div>
            </div>
        </nav> 
    </>
  )
}
export default Navbar