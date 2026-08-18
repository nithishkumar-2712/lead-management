import React from "react";
import "./BranchesStart.css";
import {
  FaBuilding,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";

const branches = [
  {
    city: "Salem",
    address: [
      "3/54, Kamala Complex,",
      "Meyyanur Road, 5 Roads,",
      "Salem - 636004",
    ],
    phone: "97903 47663",
  },
  {
    city: "Coimbatore",
    address: [
      "M-4/2 TNHB New Housing Unit,",
      "Srinivasanagar,",
      "Uppilipalayam,",
      "Coimbatore - 641015",
    ],
    phone: "82200 30333",
  },
  {
    city: "Thirunelveli",
    address: [
      "54 B/1 Mothilal Street,",
      "New Kannamman Kovil Street,",
      "Tirunelveli Junction - 627001",
    ],
    phone: "82203 51222",
  },
  {
    city: "Trichy",
    address: [
      "11A, 3rd Floor,",
      "S.V.V Arcade,",
      "Thillai Nagar 4th Street,",
      "Trichy - 620018",
    ],
    phone: "82203 40333",
  },
];

const BranchesStart = () => {
  return (
    <section className="branch-section">

      <div className="title">
        <h1>Our Branches</h1>
        <p>Find our offices across Tamil Nadu</p>
      </div>

      {/* Head Office */}

      <div className="head-office">

        <div className="head-icon">
          <FaBuilding />
        </div>

        <h2>Head Office</h2>

        <h3>Madurai</h3>

        <p>
          Plot No-117, Karpaga Nagar 9th Street,
          <br />
          K.Pudur, Madurai City,
          <br />
          Madurai - 625001.
        </p>

        <div className="">
          <FaPhone /> 82200 15433
        </div>

      </div>

      {/* Carousel */}

      <div className="carousel">

        <div className="track">

          {[...branches, ...branches].map((branch, index) => (
            <div className="cardbranch" key={index}>

              <div className="icon">
                <FaLocationDot />
              </div>

              <h3>{branch.city}</h3>

              <p>
                {branch.address.map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>

              <div className="contact">
                <FaPhone /> {branch.phone}
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default BranchesStart;