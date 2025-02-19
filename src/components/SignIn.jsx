import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SignIn.module.css"; // Import the CSS module

const SignIn = ({ toggle }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/users/signin", formData);
      // Store user info or token in localStorage or context
      localStorage.setItem("user", JSON.stringify(response.data));
      // Navigate to the profile page
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
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
          <i className="bx bxs-lock-alt"></i>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button className={styles.button}>Sign in</button>
        {error && <p className={styles.error}>{error}</p>}
        <p className={styles.forgotPassword}>
          <b>Forgot password?</b>
        </p>
        <p className={styles.signUpText}>
          <span>Don't have an account?</span>
          <b onClick={toggle} className={styles.pointer}>
            Sign up here
          </b>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
