import React, { useState, useEffect , useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

import styles from "../styles/SignUp.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const SignUp = ({toggle}) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timer, setTimer] = useState(120);
  const [resendDisabled, setResendDisabled] = useState(true);  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipTimeout = useRef(null);
  const navigate = useNavigate();
  const handleFocus = () => {
    if (tooltipTimeout.current) clearTimeout(tooltipTimeout.current);
    setPasswordFocused(true);
    setShowTooltip(true);
  };
  
  const handleBlur = () => {
    tooltipTimeout.current = setTimeout(() => {
      setShowTooltip(false);
      setPasswordFocused(false);
    }, 1000); // Show tooltip for 2 seconds after blur
  };
  
  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // ✅ Store Google Login Data in localStorage
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("accessToken");
    const userEmail = params.get("email");

    if (token && userEmail) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("userEmail", userEmail);
      navigate("/ProductPage"); // Redirect after successful login
    }
  }, [navigate]);

  const sendOtp = async () => {

        // Phone number validation
        if (!/^\d{10}$/.test(phone)) {
          toast.error("Phone number must be exactly 10 digits.");
          return;
        }

    try {
      const response = await axios.post("http://localhost:5000/api/users/send-otp", { phone });
      if (response.status === 200) {
        setOtpSent(true);
        toast.success("OTP sent successfully!");
        setTimer(120);
        setResendDisabled(true);
      }
    } catch {
      toast.error("Failed to send OTP. Try again.");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

        // OTP validation: Ensure it is exactly 6 digits
        if (!/^\d{6}$/.test(otp)) {
          toast.error("OTP must be a 6-digit number.");
          return;
        }

    if (otp.length !== 6) {
      toast.error("OTP must be a 6-digit number.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/users/verify-otp", { phone, otp });
      toast.success(response.data.message);
      setOtpVerified(true);
    } catch (err) {
      toast.error(err.response?.data?.error || "Invalid OTP.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

     // Email validation
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
       toast.error("Please enter a valid email address.");
       return;
     }

    if (!allValid) {
      toast.error("Password does not meet the criteria.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/users/signup", {
        email,
        password,
        phone
      });
  
      // ✅ Store user email in local storage
      localStorage.setItem("userEmail", email);
      toast.success("Successfully Signed Up . Please Log In...");
      navigate("/login");
      setTimeout(() => {
        window.location.reload();
      }, 500); // Small delay to ensure navigation happens before refresh
    } catch (err) {
      toast.error(err.response?.data?.error || "Signup failed.");
    }
  };
  

  const passwordCriteria = {
    minLength: password.length >= 8,
    upperCase: /[A-Z]/.test(password),
    lowerCase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    noSpaces: !/\s/.test(password),
  };
  const allValid = Object.values(passwordCriteria).every(Boolean);

  return (
    <div className={styles.formWrapper}>
      <ToastContainer position="top-center" autoClose={3000} closeButton={false} />
      <form className={styles.form} onSubmit={otpVerified ? handleSignUp : verifyOtp}>
        {!otpSent && (
          <div className={styles.inputGroup}>
          <input 
            type="tel" 
            placeholder="Enter Phone Number" 
            className={styles.inputg} 
            value={phone} 
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 10); // Remove non-digits & limit to 10 digits
              setPhone(value);
            }} 
            required 
          />            
          <button type="button" className={styles.button} onClick={sendOtp}>Send OTP</button>
          </div>
        )}

        {otpSent && !otpVerified && (
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} required />
            <button type="submit" className={styles.button}>Verify OTP</button>
          </div>
        )}

        {otpSent && !otpVerified && (
          <p className={styles.timer}>Resend OTP in {timer}s</p>
        )}
        {otpSent && !otpVerified && !resendDisabled && (
          <button type="button" className={styles.resendButton} onClick={sendOtp} disabled={resendDisabled}>Resend OTP</button>
        )}

{otpVerified && (
          <>
            <div className={styles.inputGroup}>
              <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
              />
              {showTooltip && (
  <div className={styles.passwordTooltip}>
    {Object.entries(passwordCriteria).map(([key, valid]) => (
      <p key={key}>
        {valid ? <FaCheckCircle color="green" /> : <FaTimesCircle color="red" />} 
        {key.replace(/([A-Z])/g, ' $1').trim()}
      </p>
    ))}
  </div>
)}
            </div>
            <div className={styles.inputGroup}>
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <button type="submit" className={styles.button}>Confirm</button>
          </>
        )}

        <div className={styles.orContainer}>
          <div className={styles.line}></div>
          <p className={styles.orText}>OR</p>
          <div className={styles.line}></div>
        </div>

        <p className={styles.authTitle}>Signup with other options</p>
        <div className={styles.authButtons}>
          <a href="http://localhost:5000/api/users/auth/google" className={styles.googleButton}><FcGoogle className={styles.icon} /></a>
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <p className={styles.loginRedirect}>
  Have an account?{" "}
  <b onClick={toggle} className={styles.pointer}> Sign In</b>
</p>

      </form>
    </div>
  );
};

export default SignUp;