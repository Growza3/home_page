import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "../styles/ProductHome.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";



const ProductHome = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false); // Track cart pop-up visibility
  
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch("http://localhost:5000/home/products-home")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle adding to cart
  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("authToken");
       console.log("Retrieved Token:", token);
   
       if (!token) {
         console.error("No token found! User is not logged in.");
         alert("Please log in to add items to the cart.");
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
         await axios.post("http://localhost:5000/api/cart", cartItem, {
           headers: { Authorization: `Bearer ${token}` },
         });
   
         alert("Item added to cart!");
         setCartItems((prevItems) => [...prevItems, product]); // Update cart state
   setIsCartOpen(true);
 
       } catch (error) {
         console.error("Failed to add to cart:", error.response?.data || error.message);
         alert("Failed to add item to cart. Please try again.");
       }
     };

  // Handle Buy Now
  const handleBuyNow = (product) => {
    navigate(`/checkout?product=${product._id}`);
  };
  const handleCheckout = () => {
    navigate("/cart");
  };
  
  return (
    <div className={styles.productContainer}>
      <h1 className={styles.title}>Our <span className={styles.highlight}>Products</span> </h1>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={-350}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className={styles.productSwiper}
      >
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
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className={styles.card}>
              <span className={styles.cartIcon} onClick={() => handleAddToCart(product)}>
                <FaShoppingCart className={styles.icon} />
              </span>

              <div className={styles.imageContainer}>
                <img
                  src={product.images[0]}
                  className={styles.thumbnailImage}
                  alt={product.name}
                />
              </div>

              <div className={styles.productDetailContainer}>
                <div className={styles.leftDetails}>
                  <h5 className={styles.dressName}>{product.name}</h5>
                  <p className={styles.category}>{product.category}</p>
                </div>

                <div className={styles.rightDetails}>
                  <span className={styles.newPrice}>₹{product.price}</span>
                  <p className={styles.stock}>Stock: {product.stock}</p>
                </div>
              </div>

              <div className={styles.footerContainer}>
                <span className={styles.buyButton} onClick={() => handleBuyNow(product)}>
                  <FaShoppingBag className={styles.icon} /> BUY
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductHome;