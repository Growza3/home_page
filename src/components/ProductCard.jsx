import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ProductCard.module.css';
import i1 from '../assets/images/carrot.jpg';
import i2 from '../assets/images/dragon.png';
import i3 from '../assets/images/strawberry.png';
import i4 from '../assets/images/tomato.png';

const products = [
  { id: 1, name: "Organic Tomato", price: 5.99, image: i1 },
  { id: 2, name: "Organic Lettuce", price: 3.99, image: i2 },
  { id: 3, name: "Organic Carrot", price: 4.49, image: i3 },
  { id: 4, name: "Organic Spinach", price: 6.49, image: i4 },
  // Add more products here if needed
];

const ProductCard = () => {
  const navigate = useNavigate(); // Hook to navigate

  const handleEyeClick = (id) => {
    // Navigate to the product detail page when eye button is clicked
    navigate(`/product/${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.cardImageContainer}>
              <img src={product.image} alt={product.name} className={styles.cardImage} />
            </div>
            <div className={styles.cardInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productPrice}>${product.price}</p>
              <div className={styles.buttons}>
                <button
                  className={styles.eyeButton}
                  onClick={() => handleEyeClick(product.id)} // Navigate on click
                >
                  👁️
                </button>
                <button className={styles.cartButton}>🛒</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
