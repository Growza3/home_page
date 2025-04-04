import React, { useState, useEffect } from "react";
import styles from "../styles/Payment.module.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Loader from "./LoaderTruck";

const GST_RATE = 0.18;
const DELIVERY_CHARGE = 50;

const Payment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quantity = parseInt(searchParams.get("quantity")) || 1;
  
  const {
    buyerEmail: passedBuyerEmail,
    cartItems,
    singleProduct, // ✅ NEW: This will contain the single product details if the user is buying directly
    deliveryDetails: passedDeliveryDetails,
    billingSummary 
  } = location.state || {};

  // ✅ Determine checkout items: Use singleProduct if it's present, otherwise cartItems
  const isSingleProductCheckout = !!singleProduct;
  const itemsToCheckout = isSingleProductCheckout ? [singleProduct] : cartItems || [];
  
  
  
  // ✅ Ensure proper subtotal calculation
  const subTotal = isSingleProductCheckout
  ? singleProduct.price * quantity // Adjust subtotal based on quantity  // ✅ Corrected: Now using the extracted quantity
    : itemsToCheckout?.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0) || 0;
  
  const [buyerEmail, setBuyerEmail] = useState(passedBuyerEmail || localStorage.getItem("userEmail") || "");
  const [loading, setLoading] = useState(false);  // ⬅️ Loader state

  
  useEffect(() => {
    if (passedBuyerEmail) {
      setBuyerEmail(passedBuyerEmail);
    }
  }, [passedBuyerEmail]);

  const [deliveryDetails, setDeliveryDetails] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    landmark: "",
  });

  useEffect(() => {
    if (passedDeliveryDetails) {
      setDeliveryDetails(passedDeliveryDetails);
    } else {
      // ✅ If no passed delivery details, check localStorage or set defaults
      const storedDetails = JSON.parse(localStorage.getItem("deliveryDetails"));
      if (storedDetails) {
        setDeliveryDetails(storedDetails);
      }
    }
  }, [passedDeliveryDetails]);
  

  const [selectedMethod, setSelectedMethod] = useState("creditCard");
  const [scannerConfirmed, setScannerConfirmed] = useState(false);
  

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleDeliveryChange = (e) => {
    setDeliveryDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const gstAmount = subTotal * GST_RATE;
  const totalAmount = subTotal + gstAmount + DELIVERY_CHARGE;

  // ✅ Function to handle QR Code scanning confirmation
  const checkPaymentStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/check-payment?email=${buyerEmail}`);
      if (response.data.status === "Success") {
        setScannerConfirmed(true);
        alert("Payment Successful!");
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    }
  };

  useEffect(() => {
    if (selectedMethod === "scanner" && !scannerConfirmed) {
      const interval = setInterval(checkPaymentStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [selectedMethod, scannerConfirmed]);

  // ✅ Handle the Payment Process
  const handlePayment = async () => {
    try {
      setLoading(true); // ⬅️ Start Loader

      if (!buyerEmail) return alert("Error: Unable to place order. Please log in again.");
      if (!itemsToCheckout || itemsToCheckout.length === 0) return alert("No items to checkout.");

      if (selectedMethod === "creditCard" && (!cardNumber.trim() || !cardHolder.trim() || !expDate || !cvv.trim())) {
        return alert("Please fill in all card details.");
      } 

      if (selectedMethod === "cashOnDelivery" &&
          (!deliveryDetails.address.trim() || !deliveryDetails.city.trim() || !deliveryDetails.state.trim() || !deliveryDetails.postalCode.trim())) {
        return alert("Please fill in all delivery details for Cash on Delivery.");
      }
      
        const orderData = {
        buyerEmail,
        paymentMethod: selectedMethod === "creditCard"
          ? "Credit Card"
          : selectedMethod === "cashOnDelivery"
          ? "Cash on Delivery"
          : "Scanner",
          products: isSingleProductCheckout
          ? [{
              productId: singleProduct._id,
              quantity, // Use the quantity passed from URL
            }]
          : itemsToCheckout.map((item) => ({
              productId: item._id,
              quantity: item.quantity || 1, // Default to 1 if not present
          })),
        billingInfo: {
          subtotal: parseFloat(subTotal.toFixed(2)),
          gstAmount: parseFloat(gstAmount.toFixed(2)),
          deliveryCharge: parseFloat(DELIVERY_CHARGE.toFixed(2)),
          totalAmount: parseFloat(totalAmount.toFixed(2)),
        },
        deliveryDetails: selectedMethod === "cashOnDelivery" ? deliveryDetails : null,
      };
      if (isSingleProductCheckout) {
        orderData.singleProduct = {
            productId: singleProduct._id,
            name: singleProduct.name,
            quantity,
            price: singleProduct.price,
            images: singleProduct.images,
            sellerEmail: singleProduct.sellerEmail
        };
    } else {
        orderData.cartItems = cartItems.map(item => ({
            productId: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            images: item.images,
            sellerEmail: item.sellerEmail
        }));
    }
    console.log("🔹 Sending Order Data:", orderData); // Debugging
      const response = await axios.post("http://localhost:5000/api/orders", orderData);
      alert(response.data.message);

      setTimeout(() => {
      setLoading(false); // ⬅️ Stop Loader after 2 seconds
    }, 2000);

    } catch (error) {
      setLoading(false); // ⬅️ Stop Loader on error
      console.error("Error placing order:", error.response?.data || error.message);
      alert("Error processing payment. Please try again.");
    }
  };
  const handlePaymentSuccess = async (details) => {
    alert(`Transaction completed by ${details.payer.name.given_name}`);
  
    try {
      await axios.post("http://localhost:5000/api/orders", {
        buyerEmail,
        paymentMethod: selectedMethod === "scanner" ? "PayPal QR" : "PayPal",
        products: isSingleProductCheckout
        ? [{
            productId: singleProduct._id,
            quantity,
          }]
        : itemsToCheckout.map((item) => ({
            productId: item.productId,
            quantity: item.quantity || 1,
          })),
        billingInfo: {
          subtotal: parseFloat(subTotal.toFixed(2)),
          gstAmount: parseFloat(gstAmount.toFixed(2)),
          deliveryCharge: parseFloat(DELIVERY_CHARGE.toFixed(2)),
          totalAmount: parseFloat(totalAmount.toFixed(2)),
        },
        deliveryDetails: deliveryDetails || null,
        transactionId: details.id,
      });
  
      setScannerConfirmed(true);
      alert("Payment Successful!");
    } catch (error) {
      console.error("Payment processing error:", error);
      alert("Payment failed! Please try again.");
    }
  };
  
  return (
    <PayPalScriptProvider options={{ "client-id": "AU9AiV5sTkVYPqvRMTLFbfMT3WSXuc9etQfVRR8_sbn0HyISrbD9l3XCEvAOVZM5b_m7ST1Tx-ZbeDtl" }}>

    <div className={styles.cont}>
      <div className={styles.container}>
        <header>
          <h1>Payment</h1>
          <p>Choose payment method</p>
        </header>

        <div className={styles.paymentMethods}>
          <div onClick={() => setSelectedMethod("creditCard")}>
            <i className="fas fa-credit-card fa-3x"></i>
            <br />
            <span>Credit Card</span>
          </div>
          <div onClick={() => setSelectedMethod("cashOnDelivery")}>
            <i className="fa-solid fa-money-check-dollar"></i>
            <br />
            <span>Cash on Delivery</span>
          </div>
          <div onClick={() => setSelectedMethod("scanner")}>
            <i className="fas fa-qrcode fa-3x"></i>
            <br />
            <span>Scanner Payment</span>
          </div>
          {loading && <Loader />}  


        </div>

        <div className={styles.info}>
          <div className={styles.billSummary}>
            <h2>Bill Summary</h2>
            <p>Subtotal: ₹{subTotal.toFixed(2)}</p>
            <p>GST (18%): ₹{gstAmount.toFixed(2)}</p>
            <p>Delivery Charges: ₹{DELIVERY_CHARGE}</p>
            <hr />
            <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
          </div>

          {selectedMethod === "cashOnDelivery" && (
            <div className={styles.billingInfo}>
              <h4>Delivery Details</h4>
              {Object.keys(deliveryDetails).map((key) => (
                <div key={key}>
                  <label>{key.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    type="text"
                    name={key}
                    placeholder={`Enter ${key}`}
                    value={deliveryDetails[key]}
                    onChange={handleDeliveryChange}
                  />
                </div>
              ))}
            </div>
          )}
          
          {selectedMethod === "creditCard" && (
            <div className={styles.cardInfo}>
              <h4>Credit Card Info</h4>
              <label>Card number</label>
              <input type="number" placeholder="1234 5678 3456 2456" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              <label>Cardholder name</label>
              <input type="text" placeholder="John Doe" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} />
              <label>Expire date</label>
              <input type="month" value={expDate || ""} onChange={(e) => setExpDate(e.target.value)} />
              <label>CVV</label>
              <input type="text" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
            </div>
          )}

{selectedMethod === "scanner" && (
  <div className={styles.scannerSection}>
    <h4>Scan & Pay with PayPal</h4>
    
    {/* Debugging - Check if this section renders */}
    {console.log("Scanner section rendered")}

    <PayPalButtons
      style={{ layout: "horizontal" }}
      createOrder={(data, actions) => {
        console.log("Creating order...");
        return actions.order.create({
          purchase_units: [{ amount: { value: totalAmount.toFixed(2) } }],
        });
      }}
      onApprove={async (data, actions) => {
        console.log("Payment approved");
        const details = await actions.order.capture();
        handlePaymentSuccess(details);
      }}
      onError={(err) => console.error("PayPal Error:", err)}
    />
  </div>
)}
          <button className={styles.payBtn} onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
    </PayPalScriptProvider>
  );
};

export default Payment;
