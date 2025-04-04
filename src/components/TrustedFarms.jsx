import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "../styles/TrustedFarms.module.css";
import { FaLeaf, FaShieldAlt, FaAppleAlt } from "react-icons/fa";
import orangeImage from "../assets/images/f13.jpg";

const TrustedFarms = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true }); // Ensures animations replay when scrolling
  }, []);

  return (
    <section className={styles.trustedFarmsSection}>
      <div className={styles.textContainer} data-aos="fade-up">
        <h2 className={styles.heading}>The Best Trusted Farms For You</h2>
        <p className={styles.description}>
          We work with the most trusted organic farms to bring you fresh, healthy, and naturally grown food. Our commitment is to provide quality and safety in every bite.
        </p>
        <div className={styles.features}>
          <div className={styles.featureItem} data-aos="fade-right">
            <FaLeaf className={styles.icon} />
            <div>
              <h3>Natural Foods</h3>
              <p>Our farms cultivate fruits and vegetables without harmful chemicals, ensuring pure and organic produce.</p>
            </div>
          </div>
          <div className={styles.featureItem} data-aos="fade-left">
            <FaShieldAlt className={styles.icon} />
            <div>
              <h3>Formalin-Free & Safe</h3>
              <p>All our products are free from preservatives like formalin, making them safe and healthy for you and your family.</p>
            </div>
          </div>
          <div className={styles.featureItem} data-aos="fade-right">
            <FaAppleAlt className={styles.icon} />
            <div>
              <h3>100% Tasty & Fresh</h3>
              <p>Enjoy the natural taste of farm-fresh fruits and vegetables, hand-picked for quality and flavor.</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.imageContainer} data-aos="zoom-in">
        <img src={orangeImage} alt="Fresh Oranges from Our Organic Farms" className={styles.orangeImage} />
      </div>
    </section>
  );
};

export default TrustedFarms;