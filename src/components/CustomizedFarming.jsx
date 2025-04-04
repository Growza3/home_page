import React, { useEffect, useState } from "react";
import styles from "../styles/CustomizedFarming.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CustomizedFarming = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services/packages")
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching packages:", err));
  }, []);

  return (
    <div className={styles.customizedFarmingContainer}>
      <header className={styles.heroSection}>
        <h1 className={styles.customizedFarmingHeading}>🌱 Exclusive Customized Farming Packages</h1>
        <p className={styles.customizedFarmingDescription}>Choose a tailored plan for your organic farming journey.</p>
      </header>

      <div className={styles.packagesContainer}>
        {loading ? (
          <div className={styles.shimmerEffect}>Loading Packages...</div>
        ) : (
          packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              className={styles.packageCard}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.cardInner}>
                <motion.img
                  src={pkg.image}
                  alt={pkg.title}
                  className={styles.packageImage}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className={styles.overlay}>
                  <h3 className={styles.packageTitle}>{pkg.title}</h3>
                  <p className={styles.packageDescription}>{pkg.description}</p>
                  <span className={styles.packagePrice}>${pkg.price}</span>
                  <motion.button
                    className={styles.enrollBtn}
                    whileHover={{ scale: 1.12, backgroundColor: "#e68900" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate(`/package/${pkg.id}`)}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomizedFarming;