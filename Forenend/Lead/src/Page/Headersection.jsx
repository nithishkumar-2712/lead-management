import { useEffect, useState } from "react";
import "./Headersection.css";

import hero1 from "../assets/images/hero1.jpg";
import hero2 from "../assets/images/hero2.jpg";
import hero3 from "../assets/images/hero3.jpg";
import hero4 from "../assets/images/parmacy.jpg";
import hero5 from "../assets/images/parmacy2.jpg";
import hero6 from "../assets/images/hms2.jpg";
import hero7 from "../assets/images/hms.jpg";
import hero8 from "../assets/images/hero4.jpg";
import hero9 from "../assets/images/hero5.jpg";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const images = [hero1, hero2, hero3, hero4,hero5, hero6, hero7, hero8,hero9];

const Headersection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(slider);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <section className="hero">

      {/* Background Images */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`slide ${index === current ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="overlay"></div>

      {/* Hero Content */}
      <div className="hero-content">

        <h1>
          Grow Your Business
          <span> with JJEnterprises</span>
        </h1>

        <p>
          Boost Your Retail and Wholesale Business Productivity
          with JJEnterprises Software.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">
            Get Started
          </button>

          <button className="btn-secondary">
            Contact Us
          </button>
        </div>

      </div>

      {/* Left Arrow */}
      <button className="arrow left" onClick={prevSlide}>
        <FaArrowLeft />
      </button>

      {/* Right Arrow */}
      <button className="arrow right" onClick={nextSlide}>
        <FaArrowRight />
      </button>

      {/* Dots */}
      <div className="dots">

        {images.map((_, index) => (
          <span
            key={index}
            className={current === index ? "dot activvee-dot" : "dot"}
            onClick={() => setCurrent(index)}
          />
        ))}

      </div>

    </section>
  );
};

export default Headersection;


