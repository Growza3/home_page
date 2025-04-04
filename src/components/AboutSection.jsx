import React from "react";
import styles from "../styles/AboutSection.module.css";
import backgroundImg from "../assets/bg1.jpg"; // Replace with actual image
import foregroundImg from "../assets/p1.jpg"; // Replace with actual image
import ovalImage1 from "../assets/img1.jpg"; // Replace with actual image path
import ovalImage2 from "../assets/img2.jpg"; // Replace with actual image path


const AboutSection = () => {
  return (
    <div className={styles["about-top-container"]}>
      <div className={styles["background-box"]}>
        <img src={backgroundImg} alt="Background" className={styles["background-image"]} />
      </div>
      <h1 className={styles["about-title"]}>About us</h1>
      <div className={styles["foreground-container"]}>
        <img src={foregroundImg} alt="Foreground" className={styles["foreground-image"]} />
      </div>
      {/* Right Section - Text */}
      <div className={styles["about-text"]}>
        <p>
          We strive to capture a moment whose poetry is fleeting. To give shape to what 
          is impossible to touch. Share the experience of getting in touch with nature. 
          Tell a personal story that resonates with your heart.
        </p>
        <p>
          We are inspired by the eternal that we have on our planet. Nature and life itself. 
          Everything that is simple and elegant has been created for millennia using natural 
          processes. Therefore, we gratefully borrow noble forms from rivers, deserts, canyons, 
          and endless meadows and create jewelry that echoes the grace of nature.
        </p>
      </div>
      
    </div>
  );
};

export default AboutSection;
