//productCard
import React, { useState, useEffect } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2"; // Cart icon
import { TbEye } from "react-icons/tb"; // Eye icon
import styles from "../styles/ProductCard.module.css";
import { FaShoppingCart } from "react-icons/fa";
import Details from "./Details"; 
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import buy from "../assets/images/buy.gif";
import Loader from "./Loader.jsx"; // Correct import path

const ProductCard = ({ productList }) => {
  const [imageIndexes, setImageIndexes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null); // Store selected product
  const [cartItems, setCartItems] = useState([]); // Store cart items in state
  const [isCartOpen, setIsCartOpen] = useState(false); // Track cart pop-up visibility
  const [loading, setLoading] = useState(false);
  

  const navigate = useNavigate(); // Hook for navigation

 
  // Initialize image indexes when productList updates
  useEffect(() => {
    if (productList.length > 0) {
      const initialIndexes = {};
      productList.forEach((product) => {
        initialIndexes[product._id] = 0;
      });
      setImageIndexes(initialIndexes);
    }
  }, [productList]);

  // Function to handle next image
  const nextImage = (productId, imagesLength) => {
    setImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [productId]: (prevIndexes[productId] + 1) % imagesLength,
    }));
  };

  // Function to handle previous image
  const prevImage = (productId, imagesLength) => {
    setImageIndexes((prevIndexes) => ({
      ...prevIndexes,
      [productId]: (prevIndexes[productId] - 1 + imagesLength) % imagesLength,
    }));
  };
// Handle adding to cart (shows the cart pop-up)
// Handle adding to cart (shows the cart pop-up and updates local storage)
const handleAddToCart = async (product) => {
   const token = localStorage.getItem("authToken");
      console.log("Retrieved Token:", token);
  
      if (!token) {
        console.error("No token found! User is not logged in.");
        alert("Please log in to add items to the cart.");
        window.location.href = "/login";
        return;
      }
  
      let decodedToken;
      try {
        decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        
        // Check if the token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
          console.error("Token expired");
          alert("Session expired. Please log in again.");
          return;
        }
      } catch (error) {
        console.error("Invalid token:", error.message);
        alert("Session expired. Please log in again.");
        return;
      }
      const email = decodedToken?.email;
      console.log("User Email from Token:", email);
      if (!email) {
        alert("Authentication error. Please log in again.");
        return;
      }
  
      const cartItem = {
        email,
        productId: product?._id || "",
        name: product?.name || "",
        price: product?.price || 0,
        images: product?.images || [],
        quantity: 1,
      };
  
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, cartItem, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        alert("Item added to cart!");
        setCartItems((prevItems) => [...prevItems, product]); // Update cart state
  setIsCartOpen(true);

      } catch (error) {
        console.error("Failed to add to cart:", error.response?.data || error.message);
        alert("Failed to add item to cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };
const handleCheckout = () => {
  navigate("/cart");
};


// Handle checkout (navigates to Add to Cart page)
// Handle checkout (navigates to Add to Cart page)


  // *Filter Products Based on Selected Category*
  const filteredProducts = productList
  .filter((product) => product.status === "approved") // Ensure only approved products are shown
  .filter((product) =>
    selectedCategory === "All" ? true : product.category === selectedCategory
  );
  const handleBuyNow = (product) => {
    setLoading(true); // Start Loader
    setTimeout(() => {
      navigate(`/checkout?product=${product._id}`);
    }, 2000);
  };
  
  // Add useEffect to stop loader once navigated
  useEffect(() => {
    return () => setLoading(false);
  }, [navigate]); 
  

  return (
    <div>
      {loading && <Loader />}
      {isCartOpen && cartItems.length > 0 && (
        <div className={styles.cartPopup}>
          <div className={styles.cartContent}>
            <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>✖</button>
            <h3>Added to Cart ✅</h3>
            {cartItems.map((item, index) => (
              <div key={index} className={styles.cartItem}>
                <img src={item.images[0]} alt={item.name} className={styles.cartImage} />
                <h4>{item.name}</h4>
                <p>Price: ₹ {item.price}</p>
              </div>
            ))}
            <div className={styles.cartButtons}>
              <button className={styles.continueShopping} onClick={() => setIsCartOpen(false)}>
                Continue Shopping 🛍️
              </button>
              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                View Cart ➡️
              </button>
            </div>
          </div>
        </div>
      )}

      

      <div className={styles.gridContainer}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className={styles.card}>
              {/* Product Image Carousel */}
              <div className={styles.image}>
                {product.images && Array.isArray(product.images) && product.images.length > 0 ? (
                  <div className={styles.carousel}>
                    <button
                      className={styles.prevBtn}
                      onClick={() => prevImage(product._id, product.images.length)}
                    >
                      ❮
                    </button>
                    <img
                      src={`${product.images[imageIndexes[product._id]]}`}
                      alt={product.name}
                      onError={(e) => {
                        console.log("Image load failed for:", e.target.src);
                      }}
                    />
                    <button
                      className={styles.nextBtn}
                      onClick={() => nextImage(product._id, product.images.length)}
                    >
                      ❯
                    </button>
                  </div>
                ) : (
                  <p style={{ color: "red" }}>No image available</p>
                )}
              </div>

              {/* Product Details */}
              <div className={styles.details}>

                  <div className={styles.title}>
                  <h4>{product.name}</h4>
                  <h5>{product.category}</h5>
                </div>
                {/* Price & Quantity Selector */}
                <div className={styles.pdetails}>
                  <div>
                    <h2>₹ {product.price}</h2><br/>
                    <button  
                    className={styles.buyNowBtn} 
                    onClick={() => handleBuyNow(product)}
                    >
                    <FaShoppingCart /> Buy Now
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.buttons}>
                <button className={styles.btn1} onClick={() => setSelectedProduct(product)}>
  <TbEye />
</button>

<button className={styles.btn2} onClick={() => handleAddToCart(product)}>
                    <HiOutlineShoppingBag />
                  </button>
                 {/* Buy Now Button (Slide-in Effect) */}
                 
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </div>
       {/* Render Modal Only If a Product is Selected */}
      {selectedProduct && (
        <Details
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} // Close the Modal
        />
      )}
      {/* Cart Pop-up on Right Corner */}
      {isCartOpen && cartItems.length > 0 && (
        <div className={styles.cartPopup}>
          <div className={styles.cartContent}>
            <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>✖</button>
            <h3>Added to Cart ✅</h3>
            {cartItems.map((item, index) => (
              <div key={index} className={styles.cartItem}>
                <img src={item.images[0]} alt={item.name} className={styles.cartImage} />
                <h4>{item.name}</h4>
                <p>Price: ₹ {item.price}</p>
              </div>
            ))}
            <div className={styles.cartButtons}>
              <button className={styles.continueShopping} onClick={() => setIsCartOpen(false)}>
                Continue Shopping 🛍️
              </button>
              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                View Cart ➡️
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductCard;