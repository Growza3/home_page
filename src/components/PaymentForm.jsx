import { useState } from "react";
import styles from "../styles/PaymentForm.module.css"; // Module-based CSS

const PaymentForm = ({ sellerId, sellerEmail }) => {
  
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Basic");

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/payment/create-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sellerId, sellerEmail, plan: selectedPlan }), // Include selected plan
      });

      const data = await response.json();
      console.log("✅ Payment Response:", data);

      if (data.success) {
        alert(`Payment successful for ${selectedPlan} Plan! Check your email.`);
      } else {
        alert("Payment failed: " + data.message);
      }
    } catch (error) {
      console.error("❌ Payment Error:", error);
      alert("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className={styles.paymentContainer}>
      <h2 className={styles.heading}>Choose Your Plan</h2>

      {/* Subscription Plans */}
      <div className={styles.plansContainer}>
        {["Basic", "Premium", "Business"].map((plan) => (
          <div
            key={plan}
            className={`${styles.planCard} ${selectedPlan === plan ? styles.selectedPlan : ""}`}
            onClick={() => setSelectedPlan(plan)}
          >
            <h3>{plan} Plan</h3>
            <p>{plan === "Basic" ? "$10/month" : plan === "Premium" ? "$20/month" : "$30/month"}</p>
          </div>
        ))}
      </div>

      <button onClick={handlePayment} disabled={loading} className={styles.payButton}>
        {loading ? "Processing..." : `Pay for ${selectedPlan}`}
      </button>
    </div>
  );
};

export default PaymentForm;
