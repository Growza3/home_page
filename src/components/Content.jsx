import React from "react";
import styles from "../styles/Content.module.css";

const Content = ({ type, title }) => {
  return (
    <div className={`${styles.col} ${styles["align-items-center"]} ${styles["flex-col"]} ${styles[type]}`}>
      <div className={`${styles.text} ${styles[type]}`}>
        <h2>{title}</h2>
      </div>
      <div className={`${styles.img} ${styles[type]}`}>
        {/* Placeholder for images */}
      </div>
    </div>
  );
};

export default Content;
