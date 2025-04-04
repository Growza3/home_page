//SignIn.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import toaster
import "react-toastify/dist/ReactToastify.css"; // Toaster styles
import { useNavigate } from "react-router-dom";
import styles from "../styles/SignIn.module.css"; // Import CSS module

const SignIn = ({ toggle }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  

    // Validate email format
    if (!isValidEmail(formData.email)) {
      toast.error("Invalid email format", { autoClose: 3000, closeButton: false });
      return;
    }

    // Ensure password is not empty
    if (formData.password.length < 8) {
      toast.error("Incorrect password", { autoClose: 3000, closeButton: false });
      return;
    }

    setLoading(true);

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: formData.email,   
                password: formData.password,  
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Login failed: ${errorText}`);
        }

        const data = await response.json();
        
        if (!data.authToken) {
          throw new Error("Login failed: No token received from server");
        }

       // Store token in localStorage
    localStorage.setItem("authToken", data.authToken);
    localStorage.setItem("userEmail", data.userEmail);
    localStorage.setItem("sellerId", data.sellerId || "");
    console.log("Stored Token:", localStorage.getItem("authToken"));


        toast.success("Login Successful", { autoClose: 3000, closeButton: false });
        navigate("/productPage");  
    } catch (error) {
        console.error("Login error:", error.message);
        toast.error("User Not Found, Please Try to SignUp!", { autoClose: 3000, closeButton: false });
    }
  };


  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <i className="bx bx-envelope"></i>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <i className="bx bxs-user"></i>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forgot Password Link */}
        <p className={styles.pointer} onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </p>

        <button className={styles.button} disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {error && <p className={styles.error}>{error}</p>}

        <p className={styles.signUpText}>
          <span>Don't have an account?</span>
          <b onClick={toggle} className={styles.pointer}> Sign up</b>
        </p>
      </form>
    </div>
  );
};

export default SignIn;