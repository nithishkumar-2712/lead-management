import React from "react";
import "./Contact.css";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
const Contact = () => {
    const center = {
    lat: 9.949747104681249,
    lng: 78.14908553772459,
  };
    const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDW0LlIVS-Cxx0DjaFrA5mKGzpPEECfLrE",
  });
if (!isLoaded) {
  return (
    <div className="map-loading">
      <div className="loader-card">
        <div className="loader"></div>

        <h2>Loading Google Map...</h2>

        <p>Please wait while we load your location.</p>
      </div>
    </div>
  );
}
  return (
    <section className="contact-section" id="contact">

      <div className="container">

        <div className="section-title">
          <h2>Get In Touch</h2>
          <p>
            Send us your message and our team will respond within 24 hours.
          </p>
        </div>

        <div className="contact-wrapperr">

          {/* FORM */}

          <div className="contact-form-card">

            <form>

              <div className="input-group">
                <i className="fa fa-user"></i>
                <input 
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>


              <div className="input-group">
                <i className="fa fa-envelope"></i>
                <input 
                  type="email"
                  placeholder="Email Address"
                  required
                />
              </div>


              <div className="input-group">
                <i className="fa fa-phone"></i>
                <input 
                  type="text"
                  placeholder="Phone Number"
                  required
                />
              </div>


              <div className="input-group">
                <i className="fa fa-book"></i>
                <input 
                  type="text"
                  placeholder="Subject"
                  required
                />
              </div>


              <div className="input-group textarea">
                <i className="fa fa-comment"></i>

                <textarea
                  placeholder="Write Your Message..."
                  rows="6"
                  required
                />

              </div>


              <button className="submit-btn">

                Send Message

                <i className="fa-solid fa-paper-plane"></i>

              </button>


            </form>

          </div>



          {/* CONTACT INFO */}


          <div className="contact-info">


            <InfoCard 
              icon="fa-solid fa-location-dot"
              title="Office Address"
              text="123 Business Avenue, New York, USA"
            />


            <InfoCard 
              icon="fa-solid fa-phone"
              title="Phone"
              text="+1 (555) 123-4567"
            />


            <InfoCard 
              icon="fa-solid fa-envelope"
              title="Email"
              text="info@company.com"
            />


            <InfoCard 
              icon="fa-solid fa-clock"
              title="Business Hours"
              text="Mon - Fri 9:00 AM - 6:00 PM"
            />



            <div className="social-box">

              <h3>Follow Us</h3>


              <div className="social-icons">

                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>

                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>


                <a href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>


                <a href="#">
                  <i className="fab fa-x-twitter"></i>
                </a>


                <a href="#">
                  <i className="fab fa-youtube"></i>
                </a>


              </div>

            </div>


          </div>


        </div>

        {/* MAP */}

      <div className="map-container">
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "400px",
            }}
            center={center}
            zoom={14}
          >
            <Marker position={center} />
          </GoogleMap>
        )}
      </div>


      </div>

    </section>
  );
};




const InfoCard = ({icon,title,text}) => {

  return (

    <div className="info-card">

      <i className={icon}></i>

      <div>

        <h3>{title}</h3>

        <p>{text}</p>

      </div>

    </div>

  );

};



export default Contact;