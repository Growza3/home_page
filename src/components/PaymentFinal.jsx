import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import styles from "../styles/PaymentFinal.module.css";
import { useNavigate } from "react-router-dom";

const PaymentFinal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("product");
  const quantity = parseInt(searchParams.get("quantity")) || 1;
  const userEmail = localStorage.getItem("userEmail");

  const [product, setProduct] = useState(null);
  const [addressData, setAddressData] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    landmark: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product with ID:", productId);
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        const data = await response.json();
        
        console.log("API Response:", data);
  
        if (response.ok) {
          setProduct(data);
        } else {
          console.error("Error fetching product:", response.status, data);
        }
      } catch (error) {
        console.error("Fetch Product Error:", error);
      }
    };
  
    if (productId) fetchProduct();
  }, [productId]);
  

  // Fetch user's saved delivery address
 // Fetch the user's address from the backend
 useEffect(() => {
  const fetchAddress = async () => {
    try {
      console.log("Fetching address for:", userEmail);
      const response = await fetch(`http://localhost:5000/api/user-address/${userEmail}`);
      const data = await response.json();
      
      console.log("Address API Response:", data);

      if (response.ok) {
        setAddressData({
          address: data.address,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          landmark: data.landmark || "",
        });
      } else {
        console.error("Error fetching address:", response.status, data);
      }
    } catch (error) {
      console.error("Fetch Address Error:", error);
    }
  };

  if (userEmail) fetchAddress();
}, [userEmail]);


// Handle input changes
const handleChange = (e) => {
  setAddressData({ ...addressData, [e.target.name]: e.target.value });
};

// Save/Update address
const handleSave = async () => {
  try {
    console.log("Saving Address:", addressData);
    
    const response = await fetch("http://localhost:5000/api/user-address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail, ...addressData }),
    });

    const data = await response.json();
    console.log("Save Address Response:", data);

    if (response.ok) {
      alert("Address saved successfully");
      setIsEditing(false);
    } else {
      console.error("Error saving address:", response.status, data.message);
      alert("Error saving address: " + data.message);
    }
  } catch (error) {
    console.error("Error saving address:", error);
  }
};

const productPrice = product?.price || 0; // Ensure price exists

const subTotal = productPrice * quantity;
const deliveryCharge = 50; 
const gstAmount = subTotal * 0.18; 
const totalAmount = subTotal + gstAmount + deliveryCharge; 

const billingSummary = {
  subTotal,
  gstAmount,
  totalAmount, 
  deliveryCharge
};
console.log("Navigating with:", { product, addressData, userEmail, billingSummary });
localStorage.setItem("billingSummary", JSON.stringify(billingSummary));
  return (
    <div className={styles.paymentContainer}>
      <h2 className={styles.title}>Billing Summary</h2>
      {product ? (
        <div className={styles.summaryBox}>
          <img src={product.images[0]} alt={product.name} className={styles.productImage} />
          <div className={styles.productDetails}>
            <h3>{product.name}</h3>
            <p>Quantity: {quantity}</p>
            <p>Price: ₹{product.price} x {quantity}</p>
            <p>DeliveryCharge: ₹50</p>
            <p>GST Amount:  ₹{gstAmount.toFixed(2)}</p>
            <h3>Total: ₹{totalAmount}</h3>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}

      <h2 className={styles.title}>Delivery Address</h2>
      <div className="address-section">
        {isEditing ? (
          <div>
            <input type="text" name="address" value={addressData.address} onChange={handleChange} placeholder="Address" required />
            <input type="text" name="city" value={addressData.city} onChange={handleChange} placeholder="City" required />
            <input type="text" name="state" value={addressData.state} onChange={handleChange} placeholder="State" required />
            <input type="text" name="postalCode" value={addressData.postalCode} onChange={handleChange} placeholder="Postal Code" required />
            <input type="text" name="landmark" value={addressData.landmark} onChange={handleChange} placeholder="Landmark (Optional)" />
            <button onClick={handleSave} className={styles.btn}>Save Address</button>
          </div>
        ) : (
          <div>
            <p><strong>Address:</strong> {addressData.address}</p>
            <p><strong>City:</strong> {addressData.city}</p>
            <p><strong>State:</strong> {addressData.state}</p>
            <p><strong>Postal Code:</strong> {addressData.postalCode}</p>
            <p><strong>Landmark:</strong> {addressData.landmark || "N/A"}</p>
            <button onClick={() => setIsEditing(true)} className={styles.btn}>Edit Address</button>
          </div>
        )}
      </div>
      <button className={styles.btn} onClick={() => {
  console.log("Proceeding to Payment with:", { product, addressData, subTotal, gstAmount, totalAmount });

  // Ensure we are passing the correct product data
  navigate(`/payment?&quantity=${quantity}`, {
    state: {
      singleProduct: product,  // ✅ Use 'product' instead of 'selectedProduct'
      buyerEmail: userEmail,  // ✅ Use 'userEmail' from localStorage
      deliveryDetails: addressData,  // ✅ Pass addressData as delivery details
      billingSummary: {
        subTotal,
        gstAmount,
        totalAmount,
        deliveryCharge
      }
    },
  });  
}}>
  Proceed to Payment
</button>

    </div>
  );
};

export default PaymentFinal;
