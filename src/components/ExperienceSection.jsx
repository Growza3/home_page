import React from "react";
import styles from "../styles/ExperienceSection.module.css";

const ExperienceSection = () => {
  return (
    <section className={styles["experience-section"]}>
      <p className={styles["side-text"]}>Agrarium EST 1956</p>
      <h2 className={styles["experience-text"]}>
        <span>45 years of experience</span> <br />
        <span>in growing Harvest</span>
      </h2>
    </section>
  );
};

export default ExperienceSection;
