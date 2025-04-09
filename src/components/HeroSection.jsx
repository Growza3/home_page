import React, { useState, useEffect } from "react";
import styles from "../styles/HeroSection.module.css";
import home from "../assets/images/f4.png";
import watermalon from "../assets/images/watermelon2.png";
import strawberry from "../assets/images/drip.png";
import leaf from "../assets/images/l2.png"; // Add your leaf image
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const HeroSection = () => {
  const Navigate = useNavigate();
  const [watermelonVisible, setWatermelonVisible] = useState(false);
  const [strawberryVisible, setStrawberryVisible] = useState(false);
  const [heroContentVisible, setHeroContentVisible] = useState(false);
  useEffect(() => {
        // Delay to trigger the watermelon animation after mounting
        setTimeout(() => {
          setWatermelonVisible(true);
        }, 500);

        // Delay to trigger the strawberry falling animation
        setTimeout(() => {
          setStrawberryVisible(true);
        }, 300);

        setTimeout(() => {
          setHeroContentVisible(true);
        }, 500);
    }, []);

const nav = () =>{
  Navigate("/ProductPage");
}

  return (
    <section className={styles.hero}>
      {/* Strawberry Falling from the Top */}
      <div className={`${styles["drip-container"]} ${strawberryVisible ? styles.show : ""}`}>
        <img src={strawberry} alt="strawberry" className={styles["drip-image"]} />
      </div>

      <div className={`${styles.heroContent} ${heroContentVisible ? styles["fade-in"] : ""} `}>        
        <p className={styles.discount}>EXTRA 50% OFF FOR ALL WINTER PRODUCT</p><br/>
        <h1 className={styles.heading}>Modern Problem's <br /> Organic Solution</h1><br/>
        <Link to="/ProductPage" className={styles.shopButton}>Shop Now</Link>      </div>

      <div className={styles.heroImage}>
        <img src={home} alt="Fruit Splash" />
      </div>

      {/* Watermelon Animation */}
      <div className={`${styles["watermelon-container"]} ${watermelonVisible ? styles.show : ""}`}>
        <img src={watermalon} alt="Watermelon" className={styles["watermelon-image"]} />
      </div>

      {/* Leaf Image Positioned at Bottom Left */}
      <div className={styles["leaf-container"]}>
        <img src={leaf} alt="Leaf" className={styles["leaf-image"]} />
      </div>
    </section>
  );
};

export default HeroSection;
