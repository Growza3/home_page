import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/ResetPassword.module.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newPassword }), // ✅ No need to send token in body
        });
        
      alert("Password reset successful. You can now log in.");
      navigate("/login");
    } catch (error) {
      alert("Invalid or expired token.");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.button} type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
