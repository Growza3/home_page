import React from "react";
import styles from "../styles/AboutUs.module.css";
import { FaTractor, FaSeedling, FaAppleAlt } from "react-icons/fa"; // Icons

const AboutUs = () => {
  return (
    <section className={styles["experience-container"]}>
      <div className={styles["content-box"]}>
        <p className={styles["experience-title"]}>Experience</p>
        <h2 className={styles["experience-heading"]}>
          We do <span className={styles.highlight}>Creative</span> <br />
          Things for Success
        </h2>
        <p className={styles["experience-text"]}>
          Ballan wrasse climbing gourami amur pike Arctic char, steelhead sprat
          sea lamprey grunion. Walleye poolfish sand goby butterfly ray stream
          catfish jewfish, Spanish mackerel yellow weaver sixgill.
        </p>
        <p className={styles["experience-text"]}>
          Sandperch flyingfish yellowfin cutthroat trout grouper whitebait
          horsefish bullhead shark California smoothtongue, striped burrfish
          threadtail.
        </p>
        <div className={styles["experience-features"]}>
          <div className={styles["feature"]}>
            <FaTractor className={styles["feature-icon"]} />
            <p className={styles["feature-text"]}>Modern Agriculture Equipment</p>
          </div>
          <div className={styles["feature"]}>
            <FaSeedling className={styles["feature-icon"]} />
            <p className={styles["feature-text"]}>Awesome Harvest of Wheat</p>
          </div>
          <div className={styles["feature"]}>
            <FaAppleAlt className={styles["feature-icon"]} />
            <p className={styles["feature-text"]}>Fresh Fruits & Vegetables</p>
          </div>
        </div>
        <button className={styles["explore-btn"]}>Explore more</button>
      </div>
    </section>
  );
};

export default AboutUs;
