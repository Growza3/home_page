import React from "react";
import styles from "../styles/Footer.module.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerSections}>
          {/* About Section */}
          <div className={styles.footerSection}>
            <h3>About Us</h3>
            <p>
              We provide high-quality organic farming products to ensure a healthy and sustainable lifestyle.
            </p>
          </div>

          {/* Customer Service */}
          <div className={styles.footerSection}>
            <h3>Customer Service</h3>
            <ul>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/shipping">Shipping & Returns</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          {/* Sell with Us */}
          <div className={styles.footerSection}>
            <h3>Sell with Us</h3>
            <p>Join us as a seller and grow your business with our platform.</p>
            <Link to="/SellerLanding" className={styles.sellerBtn}>Start Selling</Link>
          </div>
        </div>

        {/* Social Media */}
        <div className={styles.socialMedia}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        </div>

        {/* Copyright */}
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Organic Farming. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
