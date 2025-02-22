import React from "react";
import Header from "./Header";
import ProductList from "./ProductList";
import styles from "../styles/ProductPage.module.css";
import farm from "../assets/images/farming.mp4";

const ProductPage = () => {
  return (
    <>
      <Header />

      {/* Video Section */}
      <section className={styles.videoSection}>
        <video autoPlay loop muted>
          <source src={farm} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.videoOverlay}>Experience Organic Farming</div>
      </section>

      {/* Main Content with Background Image */}
      <div className={styles.mainContent}>
        {/* Category Section */}
        <section className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>Shop by Category</h2>
          <div className={styles.categoryContainer}>
            {[
              "Fruits", "Vegetables", "Spices", "Herbs", "Flowers", "Equipments", "Dry-fruits", "Grains", "Fertilizers", "Seeds"
            ].map((category, index) => (
              <div className={styles.categoryItem} key={index}>
                <img src={`/images/${category.toLowerCase()}.jpg`} alt={category} />
                <p>{category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Product Section */}
        <ProductList />
      </div>
    </>
  );
};

export default ProductPage;
