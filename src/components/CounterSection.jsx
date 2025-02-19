import React from "react";
import CountUp from "react-countup";
import styles from "../styles/CounterSection.module.css";

const CounterSection = () => {
  return (
    <section className={styles["counter-section"]}>
      <div className={styles["counter-container"]}>
        <div className={styles["counter-box"]}>
          <h2><CountUp start={0} end={5000} duration={3} />+</h2>
          <p>Happy Customers</p>
        </div>
        <div className={styles["counter-box"]}>
          <h2><CountUp start={0} end={150} duration={3} />+</h2>
          <p>Farmers Registered</p>
        </div>
        <div className={styles["counter-box"]}>
          <h2><CountUp start={0} end={1200} duration={3} />+</h2>
          <p>Orders Completed</p>
        </div>
        <div className={styles["counter-box"]}>
          <h2><CountUp start={0} end={20} duration={3} />+</h2>
          <p>Countries Served</p>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
