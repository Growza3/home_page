import React, { useState, useEffect } from "react";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import Content from "../components/Content";
import styles from "../styles/ContSign.module.css"; // Importing the styles object

const ContSign = () => {
  const [isSignIn, setIsSignIn] = useState(false);

  const toggle = () => {
    setIsSignIn((prev) => !prev);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSignIn(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.container} ${isSignIn ? styles["sign-in"] : styles["sign-up"]}`}>
      
      <div className={styles.row}>
        {/* SignUp Section */}
        <div className={`${styles.col} ${styles["align-items-center"]} ${styles["flex-col"]}`}>
          <SignUp toggle={toggle} />
        </div>

        {/* SignIn Section */}
        <div className={`${styles.col} ${styles["align-items-center"]} ${styles["flex-col"]}`}>
          <SignIn toggle={toggle} />
        </div>
      </div>

      {/* Content Section */}
      <div className={`${styles.row} ${styles["content-row"]}`}>
        <Content type="sign-in" title="Welcome" />
        <Content type="sign-up" title="Join with us" />
      </div>
    </div>
  );
};

export default ContSign;
