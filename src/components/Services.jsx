  import React, { useState } from "react";
  import styles from "../styles/Services.module.css";
  import { FaCloudSun, FaSeedling, FaLeaf, FaHandsHelping, FaUser, FaQuestionCircle } from "react-icons/fa";
  import { FaClipboardList, FaUserCheck, FaShoppingBasket, FaLink } from "react-icons/fa";
  import { useNavigate } from "react-router-dom";
  import Options from "./Options";
import Testimonials from "./Testimonials";
import farmer1 from "../assets/images/farmer1.jpg";
import farmer2 from "../assets/images/farmer2.jpg";


  const options = [
      {
        title: "100% Organic",
        subtitle: "No Chemicals, Only Nature's Goodness",
        icon: "fas fa-leaf",
        background: "/images/organic.jpg",
      },
      {
        title: "Farm to Table",
        subtitle: "Freshly Harvested, Direct from Farmers",
        icon: "fas fa-tractor",
        background: "/images/farm-to-table.jpg",
      },
      {
        title: "Sustainable Farming",
        subtitle: "Eco-Friendly & Ethical Farming Practices",
        icon: "fas fa-seedling",
        background: "/images/sustainable.jpg",
      },
      {
        title: "Health Benefits",
        subtitle: "Rich in Nutrients & Free from Harmful Additives",
        icon: "fas fa-apple-alt",
        background: "/images/healthy.jpg",
      },
      {
        title: "Eco-Friendly Packaging",
        subtitle: "Biodegradable & Environmentally Safe",
        icon: "fas fa-recycle",
        background: "/images/eco-packaging.jpg",
      },
    ];

  const Services = () => {
      const navigate = useNavigate();
      const [activeIndex, setActiveIndex] = useState(0);
      const handleClick = () => {
        window.location.href = "/farmform"; // Redirects to the desired page
      };
      const handleClick1 = () => {
        window.location.href = "/weather"; // Redirects to the desired page
      };
      const handleClick2 = () => {
        window.location.href = "/tips"; // Redirects to the desired page
      };
      
    return (
      <div className={styles["services-container"]}>
        {/* Hero Section with Background Image */}
        <section className={styles.hero}>
          <div className={styles["hero-content"]}>
            <h1>Revolutionize Your Organic Farming</h1>
            <button className={styles["get-started-btn"]}>Get Started</button>
          </div>
        </section>

        {/* Services Grid */}
        <div className={styles["services-grid"]}>
        <div className={styles["service-card"]} onClick={handleClick}>
  <FaSeedling className={styles["service-icon"]} />
  <h3>Customized Farming</h3>
  <p>Personalized farming solutions tailored to your needs.</p>
</div>


          <div className={styles["service-card"]} onClick={handleClick1}>
            <FaCloudSun className={styles["service-icon"]} />
            <h3>Weather Alert System</h3>
            <p>Real-time weather updates to optimize your crops.</p>
          </div>

          <div className={styles["service-card"]}onClick={handleClick2}>
            <FaLeaf className={styles["service-icon"]} />
            <h3>Home Gardening Tips</h3>
            <p>Expert tips for growing organic vegetables at home.</p>
          </div>

          <div className={styles["service-card"]}>
            <FaHandsHelping className={styles["service-icon"]} />
            <h3>Community Support</h3>
            <p>Join a network of organic farmers and share knowledge.</p>
          </div>
        </div>

        {/* How It Works Section */}
        <section className={styles["how-it-works"]}>
          <div className={styles["title-container"]}>
        <h2 className={styles["section-title"]}>How It Works</h2>
        <FaLink
              className={styles["link-icon"]}
              onClick={() => navigate("/farmform")}
              title="Go to Form"
            />
            </div>
        <div className={styles["steps-container"]}>
          
          <div className={styles["step-card"]}>
            <FaClipboardList className={styles["step-icon"]} />
            <h3>Step 1: Fill the Form</h3>
            <p>Provide details like available space, environment, budget, and farming goals.</p>
          </div>

          <div className={styles["step-card"]}>
            <FaUserCheck className={styles["step-icon"]} />
            <h3>Step 2: We Analyze Your Needs</h3>
            <p>Our experts analyze your requirements and create a personalized farming plan.</p>
          </div>

          <div className={styles["step-card"]}>
            <FaHandsHelping className={styles["step-icon"]} />
            <h3>Step 3: On-Site Expert Demo</h3>
            <p>We send our professionals to guide you in setting up your organic farm.</p>
          </div>

          <div className={styles["step-card"]}>
            <FaSeedling className={styles["step-icon"]} />
            <h3>Step 4: Grow & Maintain</h3>
            <p>With our expert guidance, watch your organic crops grow healthily.</p>
          </div>

          <div className={styles["step-card"]}>
            <FaShoppingBasket className={styles["step-icon"]} />
            <h3>Step 5: Harvest & Sell</h3>
            <p>Enjoy fresh, organic produce and even earn by selling your crops.</p>
          </div>
        </div>
      </section>
      <h2 className={styles.whychooseus}>Why Choose Us</h2>
      {/* Options Section (Replaces Why Choose Us) */}
          <Options/>

        {/* Testimonials Section */}
       <Testimonials/>

        {/* FAQ Section */}
        <section className={styles["faq"]}>
  <h2>Frequently Asked Questions (FAQ) for Sellers</h2>

  <div className={styles["faq-item"]}>
    <h3>📌 How do I start selling on Growza?</h3>
    <p>To start selling, sign up as a seller, complete your profile, and list your organic products with certification details. Once approved, your products will be available for buyers.</p>
  </div>

  <div className={styles["faq-item"]}>
    <h3>📦 What are the shipping guidelines?</h3>
    <p>Orders must be shipped within the committed timeframe. Sellers are responsible for ensuring safe and timely deliveries to maintain customer trust.</p>
  </div>

  <div className={styles["faq-item"]}>
    <h3>💰 When will I receive payments for my sales?</h3>
    <p>Payments will be processed within 7 days after the successful completion of an order. You can track your earnings in your seller dashboard.</p>
  </div>

  <div className={styles["faq-item"]}>
    <h3>🚨 What happens if I violate the seller terms?</h3>
    <p>Any fraudulent activity or non-compliance with organic guidelines will result in penalties, including potential account suspension.</p>
  </div>

  <div className={styles["faq-item"]}>
    <h3>🛡️ Do I need organic certification to sell?</h3>
    <p>Yes, all products listed on our platform must comply with organic certification guidelines. You can upload certification documents during product listing.</p>
  </div>
</section>



      </div>
    );
  };

  export default Services;