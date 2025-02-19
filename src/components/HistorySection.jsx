import React from "react";
import styles from "../styles/HistorySection.module.css";
import historyImage from "../assets/history.jpg";
import badge1 from "../assets/img1.jpg";
import badge2 from "../assets/img2.jpg";
import badge3 from "../assets/img3.jpg";
import badge4 from "../assets/img4.jpg";

const HistorySection = () => {
  return (
    <section className={styles.historySection}>
      <div className={styles.historyContent}>
        <h3 className={styles.historyTitle}>History</h3>
        <h2 className={styles.historyHeading}>
          Farming has been since <span>1956</span>
        </h2>
        <div className={styles.historyTimeline}>
          <div className={styles.year}>1956</div>
          <div className={styles.historyText}>
            <h4>The Beginning</h4>
            <p>
              Ballan wrasse climbing gourami amur pike Arctic char, steelhead
              sprat sea lamprey grunion. Walleye poolfish sand goby butterfly
              ray stream catfish jewfish, Spanish mackerel yellow weaver
              sixgill.
            </p>
          </div>
        </div>
        <div className={styles.historyBadges}>
          <img src={badge1} alt="Badge 1" />
          <img src={badge2} alt="Badge 2" />
          <img src={badge3} alt="Badge 3" />
          <img src={badge4} alt="Badge 4" />
        </div>
      </div>
      <div className={styles.historyImage}>
        <img src={historyImage} alt="History Illustration" />
      </div>
    </section>
  );
};

export default HistorySection;
