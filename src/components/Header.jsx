import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>🌿</div>
      <ul className={styles["nav-links"]}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/services">Gardening Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/ProductPage">Login</Link></li>
        <li><Link to="/SellerSignup">Login</Link></li>
        <li><Link to="/SellerDashboard">Login</Link></li> {/* Added Login link */}
      </ul>
      <div className={styles["search-icon"]}>🔍</div>
    </nav>
  );
};

export default Header;
  