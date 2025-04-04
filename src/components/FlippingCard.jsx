import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/FlippingCard.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const FlippingCard = ({ product, onUpdate, onDelete }) => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  // Ensure `product.images` is an array and format the URLs properly
// Handle both single imageUrl and multiple images array
const imageUrls = [
  ...(product.imageUrl ? [`http://localhost:5000${product.imageUrl}`] : []),
  ...(Array.isArray(product.images) ? product.images.map(img => `http://localhost:5000/uploads/${img}`) : [])
];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated product
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/${product._id}`,
        editedProduct
      );
      onUpdate(response.data);
      setShowEditPopup(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Delete product
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${product._id}`);
      onDelete(product._id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
     <div className={styles.productContainer}>
  {/* Left Section - Image Display */}
  <div className={styles.imageContainer}>
    {imageUrls.length > 0 ? (
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className={styles.productSwiper}
      >
        {imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <img src={url} alt={`${product.name} ${index + 1}`} className={styles.productImage} />
          </SwiperSlide>
        ))}
      </Swiper>
    ) : (
      <img src="/placeholder.jpg" alt="No Image Available" className={styles.productImage} />
    )}
  </div>


        {/* Right Section - Product Details */}
        <div className={styles.detailsContainer}>
          <h3>{product.name || "No Title"}</h3>
          <p><strong>Status:</strong> {product.status || "No Status"}</p>
          <p><strong>Category:</strong> {product.category || "No Category"}</p>
          <p><strong>Price:</strong> ${product.price || "0.00"}</p>
          <p><strong>Stock:</strong> {product.stock || "0"}</p>

          {/* Action Buttons */}
          <div className={styles.buttonContainer}>
            <button className={styles.editButton} onClick={() => setShowEditPopup(true)}>✏️ Edit</button>
            <button className={styles.deleteButton} onClick={handleDelete}>🗑️ Delete</button>
          </div>
        </div>
      </div>

      {/* Edit Product Popup */}
      {showEditPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupBox}>
            <h2>Edit Product</h2>
            <label>Name:</label>
            <input type="text" name="name" value={editedProduct.name || ""} onChange={handleInputChange} />

            <label>Category:</label>
            <input type="text" name="category" value={editedProduct.category || ""} onChange={handleInputChange} />

            <label>Price:</label>
            <input type="number" name="price" value={editedProduct.price || ""} onChange={handleInputChange} />

            <label>Stock:</label>
            <input type="number" name="stock" value={editedProduct.stock || ""} onChange={handleInputChange} />

            <label>Image URLs (comma-separated):</label>
            <input
              type="text"
              name="images"
              value={Array.isArray(editedProduct.images) ? editedProduct.images.join(", ") : ""}
              onChange={handleInputChange}
            />

            <div className={styles.popupButtons}>
              <button onClick={handleSave} className={styles.saveButton}>💾 Save</button>
              <button onClick={() => setShowEditPopup(false)} className={styles.cancelButton}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlippingCard;
