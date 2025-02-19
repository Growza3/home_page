import React from "react";
import styles from "../styles/HeroSection.module.css";
import heroImage from "../assets/sunset.jpg"; // Replace with actual image path


const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles["hero-content"]}>
        <h1>Decorate your Home with Plants</h1>
        <p>Place your order with us and get the best plants delivered to your doorstep.</p>
        <button className={styles["shop-button"]}>Shop Now</button>
      </div>
      <div className={styles["hero-image"]}>
        <img src={heroImage} alt="Decorated Room" />
      </div>

        <div className={styles.wave}>
      {/* Wave SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fillOpacity="1" d="M0,192L80,208C160,224,320,256,480,229.3C640,203,800,117,960,80C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
      <div className="blank">
      </div>
      </div>
    </section>
    
  );
};

export default HeroSection;
