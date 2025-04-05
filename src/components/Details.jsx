import React, { useState } from "react";
import "../styles/Details.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faQrcode, faCreditCard, faStar, faTimes, faEye, faInfoCircle,
  faListUl,
  faLightbulb, } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Details = ({ product, onClose }) => {
  const [showQR, setShowQR] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [mainImage, setMainImage] = useState(product?.images?.[0] || "default-image.jpg");

  if (!product) {
    return null;
  }

  const localIP = "192.168.223.94";
  const rawURL = `http://${localIP}:5000/api/farm-details/${product._id}`;
  const qrURL = rawURL.replace(/\s+/g, "");

  const handleThumbnailClick = (clickedImage) => {
    setMainImage(clickedImage);
  };

  const navigate = useNavigate();

  const addToCart = async () => {
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
    } catch (error) {
      console.error("Failed to add to cart:", error.response?.data || error.message);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="pcontainer">
          <main className="product-page">
            <div className="product-card-container">
              <div className="product-card">
                <img src={mainImage} alt={product.name} className="product-image" />
              </div>

              <div className="thumbnail-container">
                {product.images &&
                  product.images.length > 1 &&
                  product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index}`}
                      className={`thumbnail ${image === mainImage ? "active" : ""}`}
                      onClick={() => handleThumbnailClick(image)}
                    />
                  ))}
              </div>
            </div>

            <div className="product-info">
              <h1 className="title">{product.name}</h1>
              <h3 className="popup-heading">
                <FontAwesomeIcon icon={faLightbulb} /> Features
              </h3>
      <ul className="popup-list">
          {product.productFeatures?.map((feature, index) => (
  <li key={index}>
  <FontAwesomeIcon icon={faStar} /> {feature}
</li>          ))}
        </ul>
              <p className="price">
                <strong>Price:</strong> {product.price}₹
              </p>
               <p>
                  <strong>Category:</strong> {product.category}
                </p>
              <button onClick={() => addToCart(product)} className="addtocart">Add to Cart</button>



              <div className="extra-info">
               
              </div>
            </div>

            <div className="side-options">
              <button className="option-btn" onClick={() => navigate("/cart")}>
                <FontAwesomeIcon icon={faShoppingCart} /> <br /> View Cart
              </button>

              <button className="option-btn" onClick={() => setShowQR(true)}>
                <FontAwesomeIcon icon={faQrcode} /> <br /> Farm to Table
              </button>

              <button className="option-btn" onClick={() => setShowPopup(true)}>
                <FontAwesomeIcon icon={faEye} /> <br /> View More
              </button>

              <button className="option-btn">
                <FontAwesomeIcon icon={faStar} /> <br /> Rating
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* View More Pop-up */}
      {showPopup && (
  <div className="popup-overlay">
    <div className="popup-content">
      <button className="close-btn" onClick={() => setShowPopup(false)}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h2 className="popup-title">
              <FontAwesomeIcon icon={faInfoCircle} /> Product Details
            </h2>
      <div className="popup-section">
      <h3 className="popup-heading">
                <FontAwesomeIcon icon={faListUl} /> Overview
              </h3>        <p className="popup-text">{product.overview}</p>
      </div>

      <div className="popup-section">
      <h3 className="popup-heading">
                <FontAwesomeIcon icon={faLightbulb} /> Features
              </h3>
      <ul className="popup-list">
          {product.productFeatures?.map((feature, index) => (
  <li key={index}>
  <FontAwesomeIcon icon={faStar} /> {feature}
</li>          ))}
        </ul>
      </div>

      <div className="popup-section">
      <h3 className="popup-heading">
                <FontAwesomeIcon icon={faCreditCard} /> Usage Instructions
              </h3>       
               <p className="popup-text">{product.usageInstructions}</p>
      </div>
    </div>
  </div>
)}


      {/* QR Modal */}
      {showQR && (
        <div className="qr-modal-overlay">
          <div className="qr-modal-content">
            <h2>Farm-to-Table Journey</h2>
            <h3>Scan QR for More Info</h3>
            <QRCode value={qrURL} />
            <button className="close-btn" onClick={() => setShowQR(false)}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details; 
