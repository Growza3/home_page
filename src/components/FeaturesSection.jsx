import React from "react";
import styles from "../styles/FeaturesSection.module.css";
import bgImage from "../assets/image1.jpg"; // Use your uploaded image
import logo1 from "../assets/rm1.png"; // Replace with actual logos
import logo2 from "../assets/rm2.png";
import logo3 from "../assets/rm3.png";
import logo4 from "../assets/healthy4.jpg";
import logo5 from "../assets/healthy5.jpg";

const FeaturesSection = () => {
  return (
    <div className={styles.scrollingSection}>
      <div className={styles.overlayText}>
        Trusted and lovely by the best company
      </div>
      <div className={styles.scrollingLogos}>
        <div className={styles.logoTrack}>
          <img src={logo1} alt="Eat Healthy" />
          <img src={logo2} alt="Eco Friendly" />
          <img src={logo3} alt="Natural" />
          <img src={logo4} alt="100% Natural" />
          <img src={logo5} alt="Organic" />
          {/* Repeat to create infinite loop effect */}
          <img src={logo1} alt="Eat Healthy" />
          <img src={logo2} alt="Eco Friendly" />
          <img src={logo3} alt="Natural" />
          <img src={logo4} alt="100% Natural" />
          <img src={logo5} alt="Organic" />
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
