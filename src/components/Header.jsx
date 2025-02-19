import React from "react";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>🌿</div>
      <ul className={styles["nav-links"]}>
        <li><a href="#">Home</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Gardening Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <div className={styles["search-icon"]}>🔍</div>
    </nav>
  );
};

export default Header;
