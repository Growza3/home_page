import React from "react";
import styles from "../styles/Footer.module.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const Navigate = useNavigate();
  
  const handleSellerRedirect = () => {
    Navigate("/SellerLanding"); // Redirect to SellerLanding page
  };

  return (
    <footer className={styles.footer}>
      {/* Background Animated Fruits */}
      <div className={styles.fruitContainer}>
        <div className={`${styles.fruit} ${styles.fruit1}`}></div>
        <div className={`${styles.fruit} ${styles.fruit2}`}></div>
        <div className={`${styles.fruit} ${styles.fruit3}`}></div>
      </div>

      {/* Footer Content */}
      <div className={styles.container}>
        
        {/* Logo & About */}
        <div className={styles.brand}>
          <h1 className={styles.brandName}>Growza Organics</h1>
          <p>Luxury in every bite, freshness in every harvest.</p>
        </div>

        {/* Navigation */}
        <div className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
          <span className={styles.sellerLink} onClick={handleSellerRedirect}>Seller</span>
        </div>

        {/* Social Media */}
        <div className={styles.socialMedia}>
          <a href="https://facebook.com"><FaFacebookF /></a>
          <a href="https://twitter.com"><FaTwitter /></a>
          <a href="https://instagram.com"><FaInstagram /></a>
          <a href="https://linkedin.com"><FaLinkedin /></a>
        </div>
                {/* Animated Divider */}
                <div className={styles.divider}></div>

        {/* Copyright */}
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Growza Organics. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
