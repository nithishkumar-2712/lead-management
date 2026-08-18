import React from 'react'
import "./Footer.css";
function Footer() {
  return (
    <>
        <footer className="premium-footer footer">
            <div className="footer-grid">
            <div className="footer-box">
                <h2 className='jj'>JJ Enterprises</h2>

                <p>
                Trusted CRM & Business Solutions
                Provider.
                </p>
            </div>

            <div className="footer-box">
                <h3>Contact Info</h3>

                <p>
                117, Karpaga Nagar 9th Street,
                Madurai - 625007
                </p>

                <p>
                jjenterprisesho@gmail.com
                </p>

                <p>
                +91 9677556163
                </p>
            </div>

            <div className="footer-box">
                <h3>Quick Links</h3>

                <a href="#">Dashboard</a>
                <a href="#">Leads</a>
                <a href="#">Customers</a>
                <a href="#">Reports</a>
            </div>

            <div className="footer-box">
                <h3>Follow Us</h3>

                <div className="social-icons">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
                </div>
            </div>
            </div>

            <div className="footer-bottom">
            © Copyright Raja Vinodkumar JJ
            Enterprises. All Rights Reserved.
            </div>
        </footer>

    </>
  )
}
export default Footer