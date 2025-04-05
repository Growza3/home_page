import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../styles/Checkout.module.css"; // Import the module-based CSS
import { useNavigate } from "react-router-dom";


const Checkout = () => {
      const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("product"); // Get the product ID from query params
  const [products, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default 1


  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return; // Ensure there's a productId before fetching
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/${productId}`);
        const data = await response.json();
        
        if (response.ok) {
          setProduct(data);
        } else {
          console.error("Product fetch failed:", data.message);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!products) {
    return <h2>Product not found. Please go back.</h2>;
  }
 // Handle quantity change
 const updateQuantityInDatabase = async (newQuantity) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/single/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,  // Ensure this is correctly defined
        quantity: newQuantity,
      }),
    });

    const data = await response.json(); // Get response data

    if (!response.ok) {
      throw new Error(data.message || "Failed to update quantity in database");
    }

    console.log("Quantity updated:", data); // Log success
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
};


const handleIncrease = async () => {
  if (quantity < products.stock) {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    await updateQuantityInDatabase(newQuantity);  // Update database
  }
};

const handleDecrease = async () => {
  if (quantity > 1) {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    await updateQuantityInDatabase(newQuantity);  // Update database
  }
};

const handleCheckout = () => {
  navigate(`/payment-final?product=${productId}&quantity=${quantity}`);
};

  return (
    <div className={styles.checkoutContainer}>
      <h2 className={styles.checkoutTitle}>Checkout</h2>
      <div className={styles.productDetails}>
      <div className={styles.imageGallery}>
          {products.images.map((img, index) => (
            <img key={index} src={img} alt={products.name} className={styles.productImage} />
          ))}
        </div>
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{products.name}</h3>
          <p className={styles.productPrice}>₹{products.price}</p>
          <p className={styles.productStock}>Stock: {products.stock}</p>

{/* Quantity Selector */}
<div className={styles.quantitySelector}>
  <button onClick={handleDecrease} disabled={quantity === 1} className={styles.inc}>-</button>
  <span className={styles.quant}>{quantity}</span>
  <button onClick={handleIncrease} disabled={quantity >= products.stock} className={styles.inc}>+</button>
</div>
        </div>
      </div>
      <button className={styles.checkoutBtn} onClick={handleCheckout}>
  Proceed to Payment
</button>
    </div>
  );
};

export default Checkout;
