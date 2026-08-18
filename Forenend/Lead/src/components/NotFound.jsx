import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import "./NotFound.css";
import { AppContext } from "../App";
 function NotFound() {
  const navigate = useNavigate();
   const{isLoggedIn,tokencheck}=useContext(AppContext);
  return (
    <div className="notfound">
      <div className="notfound-card">

        <img
          src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
          alt="404"
        />

        <h1>404</h1>

        <h2>Oops! Page Not Found</h2>

        <p>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="btn-group">
          {!isLoggedIn?(
            <>
          <Link  to="/" className="home-btn">
            Go Home
          </Link>
            </>
          ):(
            <>
              <Link  to="/" className="home-btn">
                Go Home 
              </Link>
            </>
          )}

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>

        <span>JJ Enterprises CRM</span>

      </div>
    </div>
  );
}
export default  NotFound