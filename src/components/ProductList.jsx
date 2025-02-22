import React from "react";
import ProductCard from "./ProductCard";
import carr from "../assets/images/tomato.png";
import app from "../assets/images/strawberry.png";
import bell from "../assets/images/dragon.png";
import styles from "../styles/ProductPage.module.css";



const products = [
  { id: 1, name: "Organic Apple", image: app, price: 5.99, qty: 10 },
  { id: 2, name: "Fresh Carrot", image: carr, price: 3.49, qty: 15 },
  { id: 3, name: "Spicy Pepper", image: bell, price: 4.99, qty: 12 },
  { id: 1, name: "Organic Apple", image: app, price: 5.99, qty: 10 },
  { id: 2, name: "Fresh Carrot", image: carr, price: 3.49, qty: 15 },
  { id: 3, name: "Spicy Pepper", image: bell, price: 4.99, qty: 12 },
  { id: 2, name: "Fresh Carrot", image: carr, price: 3.49, qty: 15 },
  { id: 3, name: "Spicy Pepper", image: bell, price: 4.99, qty: 12 },
];

const ProductList = () => {
  return (
    <div className={styles["product-section"]}>
      <h2 className={styles["section-title"]}>Our Products</h2>
      <div className={styles["product-container1"]}>
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
