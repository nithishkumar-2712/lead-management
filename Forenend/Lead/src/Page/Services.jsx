import "./Services.css";
import {
  FaRocket,
  FaShieldHalved,
  FaComments,
  FaLightbulb,
  FaChartLine,
  FaBoxesStacked,
  FaChartPie,
  FaCheck,
} from "react-icons/fa6";

import image1 from"../assets/images/ebusiness-app.png"
const topServices = [
  {
    icon: <FaRocket />,
    title: "Quick Service",
    desc: "Fast sample delivery service and manufacturing support based on your business requirements.",
  },
  {
    icon: <FaShieldHalved />,
    title: "Best Quality",
    desc: "We always focus on delivering best quality products and services for customer satisfaction.",
  },
  {
    icon: <FaComments />,
    title: "Communication",
    desc: "Exchange files, messages and business communication easily through integrated systems.",
  },
  {
    icon: <FaLightbulb />,
    title: "Problem Solving",
    desc: "Improve business decisions and solve challenges with smart digital solutions.",
  },
];

 function Services() {
  return (
    <section className="services">
      <div className="heading">
        <h1>Our Services</h1>
        <p>
          Smart solutions designed to simplify your business operations,
          billing, inventory, and digital growth.
        </p>
      </div>

      <div className="service-grid">
        {topServices.map((item, index) => (
          <div className="card" key={index}>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="card billing">
        <div className="dashboard">
          <FaChartLine />
        </div>

        <div>
          <h2>EASY & FAST BILLING</h2>

          <p>
            Fast billing software designed for all business segments. Manage GST
            billing, POS, invoices, purchases, and inventory easily from one
            powerful platform.
          </p>

          <button className="btn">Read More →</button>
        </div>
      </div>

      <div className="extra">
        <div className="card">
          <div className="icon">
            <FaBoxesStacked />
          </div>

          <h3>Easily Manage</h3>

          <p>
            Manage Stock, Expiry, Prescriptions, Patient History, Supplier
            History, Outstanding payments and more.
          </p>

          <button className="btn">Enquiry</button>
        </div>

        <div className="card">
          <div className="icon">
            <FaChartPie />
          </div>

          <h3>Features</h3>

          <p>
            GST Reports, E-Way Bill, e-Invoicing, Internal Audit, TDS/TCS,
            Digital Payment, Customized Reports, MIS Reports, WhatsApp & Email
            Integration.
          </p>

          <button className="btn">Read More</button>
        </div>
      </div>

        <div className="card app-section">

        <div className="app-image">
            <img
            src={image1}
            alt="eBusiness App"
            />
        </div>

        <div>

            <h2>eBusiness Apps</h2>

            <p>
            Stay connected and get real-time updates on orders, payments,
            collections, and outstanding reports directly from your mobile phone.
            </p>

            <ul className="features">
            <li><FaCheck /> Real-time order tracking</li>
            <li><FaCheck /> Digital payment updates</li>
            <li><FaCheck /> Business analytics</li>
            <li><FaCheck /> Data integration</li>
            <li><FaCheck /> Complete order management</li>
            </ul>

            <button className="btn">Read More →</button>

        </div>

        </div>
    </section>
  );
}
export default Services