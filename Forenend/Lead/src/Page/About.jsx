import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">

        <div className="image">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900"
            alt="JJEnterprises"
          />
        </div>

        <div className="content">
          <h4>ABOUT US</h4>

          <h1>JJEnterprises</h1>

          <p>
            <strong>JJEnterprises</strong> is a trusted destination for India's
            No.1 Easy and Simple Billing Software Solution.
          </p>

          <p>
            Our billing solution is specially designed for Small Size
            Businesses, offering a complete package with Billing, Inventory
            Management, and Accounting Features to simplify everyday business
            operations.
          </p>

          <p>
            We provide both <strong>Online & Offline Billing Software</strong>{" "}
            with a modern, user-friendly interface, making it easy for anyone
            to manage their business efficiently.
          </p>

          <div className="cardsss">

            <div className="carrdd">
              <h3>Easy Billing Solution</h3>
              <p>
                Simple, Fast and Powerful Billing Software with complete
                business management.
              </p>
            </div>

            <div className="card">
              <h3>Online & Offline</h3>
              <p>
                User-Friendly Interface with smooth performance both online and
                offline.
              </p>
            </div>

            <div className="card">
              <h3>Technical Support</h3>
              <p>
                Personalized Technical Support through Remote Connection and
                WhatsApp Assistance.
              </p>
            </div>

            <div className="card">
              <h3>Since 2012</h3>
              <p>
                JJEnterprises has been delivering outstanding software
                solutions since 2012 with excellent customer satisfaction.
              </p>
            </div>

          </div>

          <p className="mission">
            Our mission is to provide superior customer experience and
            tremendous value by delivering reliable, affordable, and innovative
            billing software solutions for every growing business.
          </p>

          <button className="btn">Read More</button>
        </div>

      </div>
    </section>
  );
};

export default About;