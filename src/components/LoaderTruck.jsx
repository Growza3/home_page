// src/components/Loader.js
import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/lottie/loadtruck.json"; // Place your Lottie JSON file in the assets folder
import styles from "../styles/LoadTruck.module.css";

const LoaderTruck = () => {
  return (
    <div className={styles.loaderContainer}>
      <Lottie animationData={loadingAnimation} loop={true} className={styles.lottie} />
    </div>
  );
};

export default LoaderTruck;
