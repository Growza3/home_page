import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/SignUp.module.css";

const SignUp = ({ toggle }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Buyer", // Default role is Buyer
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:5000/api/users/signup", formData);
      setSuccess(response.data.message);
      setFormData({ username: "", email: "", password: "", confirmPassword: "", role: "Buyer" });
    } catch (err) {
      setError(err.response.data.error || "An error occurred");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Role Selection Toggle */}
        <div className={styles.roleToggle}>
          <span className={formData.role === "Buyer" ? styles.activeRole : ""} onClick={() => setFormData({ ...formData, role: "Buyer" })}>
            Buyer
          </span>
          <span className={formData.role === "Seller" ? styles.activeRole : ""} onClick={() => setFormData({ ...formData, role: "Seller" })}>
            Seller
          </span>
        </div>

        <div className={styles.inputGroup}>
          <i className="bx bxs-user"></i>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <i className="bx bx-mail-send"></i>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <i className="bx bxs-lock-alt"></i>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <i className="bx bxs-lock-alt"></i>
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button className={styles.button}>Sign up</button>
        <a href="http://localhost:5000/api/users/auth/google" className={styles.googleButton}>
          <i className="bx bxl-google"></i> Sign up with Google
        </a>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <p className={styles.switchText}>
          <span>Already have an account?</span>
          <b onClick={toggle} className={styles.pointer}>Sign in here</b>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
