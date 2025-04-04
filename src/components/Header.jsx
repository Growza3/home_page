import React from "react";
import styles from "../styles/Header.module.css";
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import logo from '../assets/images/logo2.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
 // Check login status whenever localStorage changes
 useEffect(() => {
  const checkLoginStatus = () => {
    const otpToken = localStorage.getItem("otpToken");
    const authToken = localStorage.getItem("authToken");
    const userEmail = localStorage.getItem("userEmail");

    setIsLoggedIn(!!(otpToken || authToken || userEmail));
  };

  checkLoginStatus(); // Run on component mount

  // Listen for storage changes in case login status updates
  window.addEventListener("storage", checkLoginStatus);

  return () => {
    window.removeEventListener("storage", checkLoginStatus);
  };
}, []);
const handleProfileClick = () => {
  if (isLoggedIn) {
    navigate("/buyerprofile");
  } else {
    navigate("/login");
  }
};

  return (
    <header className={styles.header}>
      <div className={styles.logo}> 
        <img src={logo} alt="Logo" className={styles.img}/>
      </div>
      <nav className={`${styles.nav} ${menuOpen ? styles.showMenu : ""}`}>
        <ul className={styles.navLinks}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/ProductPage">Product</Link></li>
          <li><Link to="/services">Service</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>

        </ul>
      </nav>
      <div className={styles.icons}>

        <span
          onClick={handleProfileClick}
          aria-label="user"
          style={{ cursor: "pointer" }}
        >
          👤
        </span>
        <Link to="/cart" aria-label="cart">🛒</Link>
      </div>
    </header>
  );
};

export default Header;
