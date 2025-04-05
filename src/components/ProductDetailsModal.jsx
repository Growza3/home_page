import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faQrcode, faCreditCard, faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../styles/ProductDetailsModal.css"; // Add styles for the modal

const ProductDetailsModal = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/${productId}`);
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    }
  }, [productId]);

  if (!product) {
    return null; // Don't render anything if product is null
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="modal-body">
          {/* Left: Product Image */}
          <div className="product-image-section">
            <img src={`http://localhost:5000/uploads/${product.images[0]}`} alt={product.name} className="product-image" />
          </div>

          {/* Right: Product Details */}
          <div className="product-info-section">
            <h2>{product.name}</h2>
            <p>{product.overview}</p>
            <p className="price">₹{product.price}</p>
            <button className="btn">Add to Cart</button>

            <div className="details">
              <button className="tab">Detail</button>
              <button className="tab">Ingredients</button>
              <button className="tab">Direction</button>
            </div>

            <div className="extra-info">
              <p>
                <strong>Category:</strong> {product.category}
              </p>
            </div>

            {/* Right Side Buttons */}
            <div className="side-options">
              <button className="option-btn">
                <FontAwesomeIcon icon={faShoppingCart} /> <br />
                Cart
              </button>
              <button className="option-btn">
                <FontAwesomeIcon icon={faQrcode} /> <br />
                Scanner
              </button>
              <button className="option-btn">
                <FontAwesomeIcon icon={faCreditCard} /> <br />
                Purchase
              </button>
              <button className="option-btn">
                <FontAwesomeIcon icon={faStar} /> <br />
                Rating
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
