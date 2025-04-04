// src/components/Loader.js
import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/load.json"; // Place your Lottie JSON file in the assets folder
import styles from "../styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <Lottie animationData={loadingAnimation} loop={true} className={styles.lottie} />
    </div>
  );
};

export default Loader;
