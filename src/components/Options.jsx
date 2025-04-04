import React, { useState } from "react";
import styles from "../styles/Options.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faUserTie, faLightbulb, faUsers, faRecycle } from "@fortawesome/free-solid-svg-icons";
import i1 from "../assets/images/i1.jpg";
import i2 from "../assets/images/i6.jpg";
import i3 from "../assets/images/i4.jpg";
import i4 from "../assets/images/i3.jpg";
import i5 from "../assets/images/i2.jpg";

const optionsData = [
  {
    background: i1,
    icon: faLeaf,
    main: "100% Organic",
    sub: "We use eco-friendly techniques for a sustainable future",
  },
  {
    background: i2,
    icon: faUserTie,
    main: "Expert Advice",
    sub: "Get personalized guidance from experienced organic farmers",
  },
  {
    background: i3,
    icon: faLightbulb,
    main: "Innovative Techniques",
    sub: "Stay ahead with modern organic farming trends and solutions",
  },
  {
    background: i4,
    icon: faUsers,
    main:"Strong Community",
    sub: "Connect with a network of organic farmers and share insights",
  },
  {
    background: i5,
    icon: faRecycle,
    main: "Eco-Friendly Approach",
    sub: "We promote responsible and sustainable farming practices",
  },
];

const Options = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.options}>
      {optionsData.map((option, index) => (
        <div
          key={index}
          className={`${styles.option} ${index === activeIndex ? styles.active : ""}`}
          style={{ backgroundImage: `url(${option.background})` }}
          onClick={() => setActiveIndex(index)}
        >
          <div className={styles.shadow}></div>
          <div className={styles.label}>
            <div className={styles.icon}>
              <FontAwesomeIcon icon={option.icon} />
            </div>
            <div className={styles.info}>
              <div className={styles.main}>{option.main}</div>
              <div className={styles.sub}>{option.sub}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Options;
