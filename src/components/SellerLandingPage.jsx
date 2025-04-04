import React from "react";
import styles from "../styles/SellerLandingPage.module.css";
import { Link } from "react-router-dom";
import Testimonials from "./Testimonials";
import { useNavigate } from "react-router-dom";

const SellerLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.background}>

      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles["hero-content"]}>
        <h1>Start Selling Organic Products & Grow Your Business</h1>
        <p>Reach millions of buyers & maximize your profits with fair commission rates.</p>
        <button onClick={() => navigate("/SellerSignup")} className={styles["get-started-btn"]}>Start Selling</button>
        </div>
      </div>

{/* How It Works Section */}
<div className={styles.howItWorks}>
  <h2>How It Works</h2>
  <div className={styles.steps}>
    <div className={`${styles.step1} ${styles.left}`}>
      <div className={styles.content}>
        <h3><span className={styles.icon}>📝</span> Step 1: Sign Up & Create Your Store</h3>
        <p>Register as a seller and set up your organic store easily.</p>
      </div>
    </div>
    <div className={`${styles.step2} ${styles.right}`}>
      <div className={styles.content}>
        <h3><span className={styles.icon}>📦</span> Step 2: List Your Organic Products</h3>
        <p>Add high-quality organic products with descriptions & pricing.</p>
      </div>
    </div>
    <div className={`${styles.step3} ${styles.left}`}>
      <div className={styles.content}>
        <h3><span className={styles.icon}>🛒</span> Step 3: Customers Place Orders</h3>
        <p>Buyers browse and place orders for your organic products.</p>
      </div>
    </div>
    <div className={`${styles.step4} ${styles.right}`}>
      <div className={styles.content}>
        <h3><span className={styles.icon}>🚚</span> Step 4: Ship & Deliver Products</h3>
        <p>Pack and ship the orders to customers safely & on time.</p>
      </div>
    </div>
    <div className={`${styles.step5} ${styles.left}`}>
      <div className={styles.content}>
        <h3><span className={styles.icon}>💰</span> Step 5: Get Paid Securely</h3>
        <p>Receive your earnings securely through multiple payment options.</p>
      </div>
    </div>
  </div>
</div>


      {/* Commission Section */}
<div className={styles.commissionSection}>
  <h2>Commission Structure</h2>
  <div className={styles.commissionWrapper}>
    <div className={styles.commissionCard}>
      <h3>₹0 - ₹500</h3>
      <p>📊 Commission: <span>5%</span></p>
    </div>
    <div className={styles.commissionCard}>
      <h3>₹501 - ₹1000</h3>
      <p>📊 Commission: <span>8%</span></p>
    </div>
    <div className={styles.commissionCard}>
      <h3>₹1001 - ₹5000</h3>
      <p>📊 Commission: <span>10%</span></p>
    </div>
    <div className={styles.commissionCard}>
      <h3>₹5001+</h3>
      <p>📊 Commission: <span>12%</span></p>
    </div>
  </div>
</div>


{/* Why Sell on Growza? */}
{/* Why Sell on Growza? */}
<div className={styles.benefitsSection}>
  <h2>Why Sell on Growza?</h2>
  <div className={styles.timeline}>
    <div className={styles.timelineItem}>
      <div className={styles.icon}>🛍️</div>
      <div className={styles.content}>
        <h3>Zero Listing Fees</h3>
        <p>No cost to list your products.</p>
      </div>
    </div>
    <div className={styles.timelineItem}>
      <div className={styles.icon}>🚀</div>
      <div className={styles.content}>
        <h3>Wide Customer Reach</h3>
        <p>Connect with thousands of buyers.</p>
      </div>
    </div>
    <div className={styles.timelineItem}>
      <div className={styles.icon}>💰</div>
      <div className={styles.content}>
        <h3>Fair Commission Rates</h3>
        <p>Only pay when you make a sale.</p>
      </div>
    </div>
    <div className={styles.timelineItem}>
      <div className={styles.icon}>📦</div>
      <div className={styles.content}>
        <h3>Effortless Order Management</h3>
        <p>Integrated seller dashboard.</p>
      </div>
    </div>
    <div className={styles.timelineItem}>
      <div className={styles.icon}>✅</div>
      <div className={styles.content}>
        <h3>Quick & Secure Payments</h3>
        <p>Get paid directly to your bank.</p>
      </div>
    </div>
  </div>
</div>



      {/* Seller Testimonials */}
      <Testimonials/>

      {/* Support & Assistance */}
      <div className={styles.supportSection}>
  <h2>Need Help?</h2>
  <div className={styles.supportCard}>
    <p>Our team is available <strong>24/7</strong> to assist you with any queries.</p>
    <div className={styles.contactInfo}>
      <div className={styles.contactItem}>
        <span className={styles.icon}>📧</span>
        <a href="mailto:support@growza.com">support@growza.com</a>
      </div>
      <div className={styles.contactItem}>
        <span className={styles.icon}>📞</span>
        <a href="tel:+919876543210">+91 9876543210</a>
      </div>
    </div>
  </div>
</div>

      {/* Terms & Conditions */}
      <div className={styles.termsContainer}>
  <h2>📜 Seller Terms & Conditions</h2>
  <div className={styles.termsList}>
    <div className={styles.term}>
      <span className={styles.icon}>📌</span>
      <p><strong>Organic Certification:</strong> Sellers must comply with organic certification guidelines.</p>
    </div>
    <div className={styles.term}>
      <span className={styles.icon}>📦</span>
      <p><strong>Timely Shipping:</strong> Orders must be shipped within the committed timeframe.</p>
    </div>
    <div className={styles.term}>
      <span className={styles.icon}>💰</span>
      <p><strong>Secure Payments:</strong> Payments will be processed within 7 days after order completion.</p>
    </div>
    <div className={styles.term}>
      <span className={styles.icon}>🚨</span>
      <p><strong>Fraud Prevention:</strong> Any fraudulent activity will result in account suspension.</p>
    </div>
  </div>
</div>


    </div>
  );
};

export default SellerLandingPage;
