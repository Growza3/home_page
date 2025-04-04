import { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Parallax } from "react-parallax";
import styles from "../styles/HomeGardeningTips.module.css";

import dayBackground from "../assets/images/day-garden.jpg";
import nightBackground from "../assets/images/night-garden.jpg";

const HomeGardeningTips = () => {
  const [isDay, setIsDay] = useState(true);

  const dayTips = [
    { icon: "🌱", title: "Soil Preparation", text: "Use compost and organic matter to enrich the soil, ensuring better plant growth." },
    { icon: "🌿", title: "Choosing the Right Plants", text: "Select plants that suit your local climate and soil conditions for better yield." },
    { icon: "💧", title: "Watering Techniques", text: "Water deeply but less frequently to encourage strong root development." },
    { icon: "🐞", title: "Pest Control", text: "Use natural remedies like neem oil and companion planting to keep pests away." },
    { icon: "🌞", title: "Sunlight Optimization", text: "Place plants based on their sunlight requirements to ensure healthy growth." },
  ];

  const nightTips = [
    { icon: "🌙", title: "Night Watering", text: "Water plants at night to prevent evaporation and allow better absorption." },
    { icon: "🔦", title: "Outdoor Lighting", text: "Use LED garden lights to maintain visibility and protect plants from nocturnal pests." },
    { icon: "🦉", title: "Natural Predators", text: "Encourage nocturnal predators like owls and bats to keep pest populations in check." },
    { icon: "❄️", title: "Frost Protection", text: "Cover plants with protective cloth to prevent frost damage in colder climates." },
    { icon: "🍃", title: "Humidity Control", text: "Mist plants lightly to maintain moisture levels and prevent excessive dryness." },
  ];

  return (
    <div
      className={styles.container}
      style={{
        background: `url(${isDay ? dayBackground : nightBackground}) no-repeat center center/cover`,
        transition: "background 1s ease-in-out",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Toggle for Day/Night Mode */}
      <button className={styles.toggleButton} onClick={() => setIsDay(!isDay)}>
        {isDay ? "🌙 Switch to Night" : "☀️ Switch to Day"}
      </button>

      {/* Tips Section with Lottie Animation */}
      <div className={styles.contentContainer}>
        <Parallax speed={-5} className={styles.tipsWrapper}>
          <div className={styles.tipsContainer}>
            {(isDay ? dayTips : nightTips).map((tip, index) => (
              <motion.div
                key={index}
                className={styles.tipBox}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h2 className={styles.tipTitle}>
                  {tip.icon} {tip.title}
                </h2>
                <p className={styles.tipText}>{tip.text}</p>
              </motion.div>
            ))}
          </div>
        </Parallax>

        {/* Lottie Animation Positioned Beside the Tips */}
       
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <h2>From Soil to Soul</h2>
        <p>Revived Roots Co.</p>
      </div>
    </div>
  );
};

export default HomeGardeningTips;
