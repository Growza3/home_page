import React from "react";
import styles from "../styles/ProfileCard.module.css"; // Import module CSS

const ProfileCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.bottom}>
        <h4 className={styles.name}>Iric Laurey</h4>
        <div className={styles.professionWrapper}>
          <p className={styles.profession}>Web designer</p>
          <button className={styles.btn}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
            </svg>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ProfileCard;
