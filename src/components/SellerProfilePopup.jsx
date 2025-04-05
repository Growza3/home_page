import React, { useState, useEffect } from "react";
import styles from "../styles/SellerProfilePopup.module.css";

const SellerProfilePopup = ({ seller, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (seller) {
      setFormData({
        username: seller.username || "",
        email: seller.email || "",
        phone: seller.phone || "",
      });
    }
  }, [seller]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/sellers/update/${seller._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Profile updated successfully!");
        onUpdate(); // Refresh the seller dashboard
        onClose(); // Close the popup
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popup}>
        <h2>Edit Profile</h2>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
        
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} disabled />
        
        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

        <button className={styles.saveBtn} onClick={handleUpdate}>Save Changes</button>
        <button className={styles.closeBtn} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SellerProfilePopup;
