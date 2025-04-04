//Slider/jsx
import React from "react";
import styles from "../styles/Slider.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <div className={styles.svgContainer}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582" />
          </svg>
        </div>
        <div>Globe Express</div>
      </div>
      <div className={styles.navLinks}>
        <div className={styles.active}>Home</div>
        <div>Holidays</div>
        <div>Destinations</div>
        <div>Flights</div>
        <div>Offers</div>
        <div>Contact</div>
      </div>
    </nav>
  );
};

const DetailsSection = ({ title1, title2, description, even }) => {
  return (
    <div className={even ? styles.detailsEven : styles.detailsOdd}>
      <div className={styles.placeBox}><div className={styles.text}>Switzerland Alps</div></div>
      <div className={styles.titleBox1}><div className={styles.title1}>{title1}</div></div>
      <div className={styles.titleBox2}><div className={styles.title2}>{title2}</div></div>
      <div className={styles.desc}>{description}</div>
      <div className={styles.cta}>
        <button className={styles.bookmark}>★</button>
        <button className={styles.discover}>Discover Location</button>
      </div>
    </div>
  );
};

const Pagination = () => {
  return (
    <div className={styles.pagination}>
      <div className={styles.arrowLeft}>←</div>
      <div className={styles.arrowRight}>→</div>
      <div className={styles.progressBar}><div className={styles.progressIndicator}></div></div>
    </div>
  );
};

const Slider = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <DetailsSection title1="SAINT" title2="ANTONIEN" description="Tucked away in the Switzerland Alps, Saint Antönien offers an idyllic retreat..." even />
      <DetailsSection title1="SAINT" title2="ANTONIEN" description="A hidden gem for backcountry skiing in winter and lush trails for hiking..." />
      <Pagination />
    </div>
  );
};

export default Slider;