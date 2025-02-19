import React from "react";
import styles from "../styles/Recipe.module.css"; // Ensure the CSS file path is correct
import r1 from "../assets/r73.png";
import r2 from "../assets/r2.png";

const Recipe = () => {
  return <>
    {/* Title Section */}
    <h1 className={styles["recipe-title"]}>Delicious Recipes</h1>
    <div className={styles.Rcontainer}>
     
      <div className={styles.Rcard}>
        <img src={r1} alt="Nike Air Jordan" className={styles.Rcard__img} />

        <div className={styles.Rcard__data}>
          <h1 className={styles.Rcard__title}>Nike Air Jordan</h1>
          <span className={styles.Rcard__preci}>$99</span>
          <p className={styles.Rcard__description}>Nike Air Jordan Footwear basketball sneakers.</p>
          <a href="#" className={styles.Rcard__button}>Buy Now</a>
        </div>
      </div>
      <div className={styles.Rcard}>
        <img src={r2} alt="Nike Air Jordan" className={styles.Rcard__img} />

        <div className={styles.Rcard__data}>
          <h1 className={styles.Rcard__title}>Nike Air Jordan</h1>
          <span className={styles.Rcard__preci}>$99</span>
          <p className={styles.Rcard__description}>Nike Air Jordan Footwear basketball sneakers.</p>
          <a href="#" className={styles.Rcard__button}>Buy Now</a>
        </div>
      </div>
      <div className={styles.Rcard}>
        <img src={r1} alt="Nike Air Jordan" className={styles.Rcard__img} />

        <div className={styles.Rcard__data}>
          <h1 className={styles.Rcard__title}>Nike Air Jordan</h1>
          <span className={styles.Rcard__preci}>$99</span>
          <p className={styles.Rcard__description}>Nike Air Jordan Footwear basketball sneakers.</p>
          <a href="#" className={styles.Rcard__button}>Buy Now</a>
        </div>
      </div>
      <div className={styles.Rcard}>
        <img src={r1} alt="Nike Air Jordan" className={styles.Rcard__img} />

        <div className={styles.Rcard__data}>
          <h1 className={styles.Rcard__title}>Nike Air Jordan</h1>
          <span className={styles.Rcard__preci}>$99</span>
          <p className={styles.Rcard__description}>Nike Air Jordan Footwear basketball sneakers.</p>
          <a href="#" className={styles.Rcard__button}>Buy Now</a>
        </div>
      </div>
      <button className={styles.ExploreButton} onClick={() => navigate("/recipes")}>
        Explore More
      </button>
    </div>
    </>
};

export default Recipe;
