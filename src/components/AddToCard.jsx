import React, { useState, useEffect } from "react";
import { FaTrash, FaCreditCard, FaPaypal } from "react-icons/fa";
import axios from "axios";
import "../styles/AddToCard.css";
import { jwtDecode } from "jwt-decode";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Payment from "./Payment";

const AddToCard = () => {
    const [userEmail, setUserEmail] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showDeliveryForm, setShowDeliveryForm] = useState(false);
    const [cartProduct, setCartProduct] = useState(null);
const [isCartOpen, setIsCartOpen] = useState(false);

    const [deliveryDetails, setDeliveryDetails] = useState({
        address: "",
        city: "",
        state: "",
        postalCode: "",
        landmark: "",
    });
    const [showPaymentButton, setShowPaymentButton] = useState(false);
    const navigate = useNavigate();
    const handleProceedToPayment = () => {
        console.log("Cart Data Before Navigation:", cartItems);  
console.log("User Email:", userEmail);  
console.log("Delivery Details Before Navigation:", deliveryDetails);  

if (!deliveryDetails) {
    alert("Please enter delivery details before proceeding to payment!");
    return;
}

navigate("/payment", { 
    state: { 
        buyerEmail: userEmail, 
        cartItems: cartItems, 
        deliveryDetails, 
    } ,
});

        
    };
    
   
    const handleClose = () => setAlertOpen(false);
   

      
    useEffect(() => {
        let token = localStorage.getItem("token") || localStorage.getItem("authToken"); // ✅ Check both tokens
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserEmail(decodedToken.email);
            } catch (error) {
                console.error("Error decoding JWT:", error);
            }
        }
    }, []);


    useEffect(() => {
        const fetchCartItems = async () => {
            if (!userEmail) return; // Prevents API call with 'null'
    
            try {
                const response = await fetch(`http://localhost:5000/api/carts/${userEmail}`);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                console.log("Cart Data:", data);
                setCartItems(data);
            } catch (error) {
                console.error("Failed to fetch cart items:", error);
            }
        };
    
        fetchCartItems();
    }, [userEmail]); // Ensure effect runs when userEmail updates
    
    // Re-run when userEmail changes
    
    
    useEffect(() => {
        const fetchDeliveryDetails = async () => {
            if (!userEmail) return; // Ensure user is logged in before fetching
    
            try {
                const response = await axios.get(`http://localhost:5000/api/delivery?email=${userEmail}`);
    
                if (response.data.length > 0) {  // Ensure array is not empty
                    const details = response.data[0]; // Access first object in array
                    console.log("Fetched delivery details:", details); // Debugging
                    
                    setDeliveryDetails({
                        address: details.address || "",  
                        city: details.city || "",
                        state: details.state || "",
                        postalCode: details.postalCode || "",
                        landmark: details.landmark || "",
                    });
    
                    setShowDeliveryForm(false);
                    setShowPaymentButton(true);
                }
            } catch (error) {
                console.error("Error fetching delivery details:", error);
            }
        };
    
        fetchDeliveryDetails();
    }, [userEmail]); // Dependency ensures fetching when userEmail changes
    
     useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(savedCart);
    }, []);
    const handleBuyNow = (product) => {
        setCartProduct(product);  // Store selected product
        setIsCartOpen(true);  // Show pop-up
    
        // Wait for the pop-up animation, then show delivery form
        setTimeout(() => {
            setIsCartOpen(false); // Close pop-up
            setShowDeliveryForm(true); // Show delivery form
        }, 3000);
    };
    const handleCloseForm = () => {
        setShowDeliveryForm(false);
        setCartProduct(null);  // Clear selected product
    };
    
    
    
      
   

    const handleDeliveryChange = (e) => {
        setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value });
    };

    const handleNav = () => {
        navigate("/ProductPage");
    };

    const handleDeliverySubmit = async (e) => {
        e.preventDefault();
        if (!userEmail) return;
    
        // Validate form fields before submission
        const { address, city, state, postalCode } = deliveryDetails;
        if (!address || !city || !state || !postalCode) {
            alert("Please fill in all required fields.");
            return;
        }
    
        try {
            await axios.post("http://localhost:5000/api/delivery", {
                email: userEmail,
                ...deliveryDetails,
            });
    
            setShowPaymentButton(true);
            alert("Delivery details saved successfully!");
    
            // ✅ Now navigate to payment only after successful submission
            handleProceedToPayment();
    
        } catch (error) {
            console.error("Error storing delivery details:", error);
        }
    };
    


    const removeItem = async (cartItemId) => {
        if (!userEmail) return;
        try {
            const response = await fetch(`http://localhost:5000/api/carts/${userEmail}/${cartItemId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error(`Failed to delete! HTTP Status: ${response.status}`);
            setCartItems((prevItems) => prevItems.filter(item => item._id !== cartItemId));
        } catch (error) {
            console.error("Error removing product:", error.message);
        }
    };

    const updateQuantity = async (product, newQuantity) => {
        if (newQuantity < 1) return;

        if (newQuantity > product.stock) {
            setAlertMessage(`Only ₹{product.stock} items available!`);
            setAlertOpen(true);
            return;
        }

        try {
            const response = await axios.put("http://localhost:5000/api/carts/update-quantity", {
                email: userEmail,
                productId: product.productId,
                quantity: newQuantity,
            });

            setCartItems((prevCart) => prevCart.map(item =>
                item.productId === product.productId
                    ? { ...item, quantity: response.data.updatedQuantity || newQuantity }
                    : item
            ));
        } catch (error) {
            console.error("Error updating quantity:", error);
            setAlertMessage("❌ Whoops! We’re fresh out of this product. Check back soon!.");
            setAlertOpen(true);
        }
    };

    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className="cart-container">
            <Snackbar open={alertOpen} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">{alertMessage}</Alert>
            </Snackbar>

            <div className="cart-section">
                {userEmail ? <p>Logged in as: {userEmail}</p> : <p>Loading user email...</p>}
                <div className="cart-items">
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <div key={`${item._id}-${index}`} className="cart-item">
                                <img
                                    src={Array.isArray(item.images) ? item.images[0] : item.images}
                                    alt={item.name}
                                    className="cart-item-image"
                                />
                                <p className="cart-item-name">{item.name}</p>
                                <div className="cart-item-quantity">
                                    <button onClick={() => updateQuantity(item, item.quantity - 1)} disabled={item.quantity <= 1} className="inc-btn">-</button>
                                    <input type="number" value={item.quantity} onChange={(e) => updateQuantity(item, parseInt(e.target.value, 10) || 1)} min="1" max={item.stock} />
                                    <button onClick={() => updateQuantity(item, item.quantity + 1)} disabled={item.quantity >= item.stock} className="inc-btn">+</button>
                                </div>
                                <div className="cart-item-prices">
    <p className="cart-item-static-price">Unit Price: ₹{item.price.toFixed(2)}</p>
    <p className="cart-item-total-price">SubTotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
</div>                

<button onClick={() => removeItem(item._id)} className="cart-item-remove"><FaTrash /></button>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>

                <div className="cart-summary">
                    <p>Total: <span className="cart-total">₹{subtotal}</span></p>
                    <button onClick={handleBuyNow} className="buy-now-btn">Buy Now</button>

                    <button className="continue-shopping" onClick={handleNav}>Continue Shopping</button>
                </div>
            </div>
           <div className={`delivery-form-container ${showDeliveryForm ? "show" : ""}`}>
           <button onClick={handleCloseForm} className="close-btn">x</button>

                <form className="delivery-form" onSubmit={handleDeliverySubmit}>
                <h3>{deliveryDetails.address ? "Edit Delivery Details" : "Enter Delivery Details"}</h3>
                    <input 
    type="text" 
    placeholder="Delivery Address" 
    value={deliveryDetails.address || ""}  
    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, address: e.target.value })} 
/>

<input 
    type="text" 
    placeholder="City" 
    value={deliveryDetails.city || ""}  
    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, city: e.target.value })} 
/>

<input 
    type="text" 
    placeholder="State" 
    value={deliveryDetails.state || ""}  
    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, state: e.target.value })} 
/>

<input 
    type="text" 
    placeholder="Postal Code" 
    value={deliveryDetails.postalCode || ""}  
    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, postalCode: e.target.value })} 
/>

<input 
    type="text" 
    placeholder="Landmark (Optional)" 
    value={deliveryDetails.landmark || ""}  
    onChange={(e) => setDeliveryDetails({ ...deliveryDetails, landmark: e.target.value })} 
/>


                    <button 
    type="submit" 
    className="submit-delivery-btn"
>
    Proceed to Pay
</button>



 </form>
 
            </div>
            
                
            {/* Payment Section */}
           
        </div>
    );
};

export default AddToCard;
