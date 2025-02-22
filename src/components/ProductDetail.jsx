import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/ProductDetail.module.css";
import Header from "./Header";
import i1 from "../assets/images/carrot.jpg";
import i2 from "../assets/images/dragon.png";
import i3 from "../assets/images/strawberry.png";
import i4 from "../assets/images/tomato.png";

// Product data

const products = [
    
  {
    id: 1,
    name: "Organic Carrot",
    price: 5.99,
    image: i1,
    description: "Fresh and organically grown carrots, packed with nutrients.",
    features: [
      { id: 1, title: "Rich in Vitamin A", text: "Boosts eyesight and skin health." },
      { id: 2, title: "Naturally Sweet", text: "No artificial flavors or sweeteners." },
      { id: 3, title: "Freshly Harvested", text: "Direct from organic farms to your home." },
    ],
  },
  {
    id: 2,
    name: "Organic Dragon Fruit",
    price: 3.99,
    image: i2,
    description: "A tropical delight full of antioxidants and fiber.",
    features: [
      { id: 1, title: "Boosts Immunity", text: "High in Vitamin C and natural antioxidants." },
      { id: 2, title: "Hydrating & Refreshing", text: "Perfect for hot summer days." },
      { id: 3, title: "Supports Digestion", text: "Rich in dietary fiber for gut health." },
    ],
  },
  {
    id: 3,
    name: "Organic Strawberry",
    price: 4.49,
    image: i3,
    description: "Sweet and juicy strawberries grown without chemicals.",
    features: [
      { id: 1, title: "Rich in Antioxidants", text: "Protects skin and heart health." },
      { id: 2, title: "No Added Sugar", text: "Pure natural sweetness." },
      { id: 3, title: "Perfect for Desserts", text: "Great for smoothies, cakes, and jams." },
    ],
  },
  {
    id: 4,
    name: "Organic Tomato",
    price: 6.49,
    image: i4,
    description: "Fresh and ripe tomatoes rich in essential vitamins.",
    features: [
      { id: 1, title: "High in Lycopene", text: "Promotes heart and skin health." },
      { id: 2, title: "Zero Preservatives", text: "100% natural farm produce." },
      { id: 3, title: "Ideal for Cooking", text: "Perfect for salads, sauces, and soups." },
    ],
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  const [zoom, setZoom] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setZoom(true);
    setTimeout(() => setFadeIn(true), 500);
  }, []);

  if (!product) {
    return <div className={styles.productNotFound}>Product not found</div>;
  }

  return (
<>
      <Header />
    <div className={styles.container}>
      {/* Dripping Effect */}
      <div className={styles.drippingEffect}></div>

      {/* Product Detail Section */}
      <div className={styles.content}>
        <div className={styles.textSection}>
          <h2 className={styles.title}>
            Welcome to <span>{product.name}</span>
          </h2>

          {product.features.map((feature) => (
            <div key={feature.id} className={styles.feature}>
              <span className={styles.featureNumber}>0{feature.id}</span>
              <div className={styles.featureText}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.imageSection}>
          <img
            src={product.image}
            alt={product.name}
            className={`${styles.productImage} ${zoom ? styles.zoomInImage : ""}`}
          />
        </div>
      </div>

      {/* Full Product Description */}
      <div className={styles.description}>
        <p>{product.description}</p>
        <p className={styles.price}>Price: ${product.price}</p>

        <div className={styles.buttons}>
          <button className={styles.addToCartButton}>🛒 Add to Cart</button>
          <button className={styles.buyNowButton}>Buy Now</button>
        </div>

        <button onClick={() => navigate("/")} className={styles.backButton}>
          Back to Products
        </button>
      </div>
    </div>
    </>
  );
};

export default ProductDetail;
