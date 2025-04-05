import React, { useState } from "react";
import styles from "../styles/SellerLogin.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import existingSellerAnimation from "../assets/lottie/Signin.json"; // Replace with actual JSON file path
import { motion } from "framer-motion";
import Lottie from "lottie-react";

const SellerLogin = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    

    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const checkEmailExists = async (email) => {

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/check-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            return data.exists; // Returns true if email exists
        } catch (error) {
            console.error("Error checking email:", error);
            return false;
        }
    };

    const generateOTP = async () => {
        try {
            if (!validateEmail(email)) {
                toast.error("Invalid Email Formate", {
                    position: "top-right",
                    autoClose: 2000,
                    closeButton: false,
                });
                return;
            }
            const emailExists = await checkEmailExists(email);
            if (!emailExists) {
                toast.error("Email not registered! Please sign up first.", {
                    position: "top-right",
                    autoClose: 3000,
                    closeButton: false,
                });
                return;
            }

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (data.success) {
                toast.success("OTP sent to your email!", {
                    position: "top-right",
                    autoClose: 3000,
                    closeButton: false,
                });
                setStep(2);
            } else {
                toast.error(data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    closeButton: false,
                });
            }
        } catch (error) {
            toast.error("Failed to send OTP. Try again.", {
                position: "top-right",
                autoClose: 3000,
                closeButton: false,
            });
        }
    };

    const verifyOTP = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await response.json();
            if (data.success) {
                toast.success("Login Successful!", {
                    position: "top-right",
                    autoClose: 3000,
                    closeButton: false,
                });
                localStorage.setItem("sellerEmail", email);
                setTimeout(() => navigate("/dashboard"), 2000);
            } else {
                toast.error("Invalid OTP! Please try again.", {
                    position: "top-right",
                    autoClose: 3000,
                    closeButton: false,
                });
            }
        } catch (error) {
            toast.error("OTP verification failed. Try again.", {
                position: "top-right",
                autoClose: 3000,
                closeButton: false,
            });
        }
    };

    return <> 
                <ToastContainer/>       
    <div className={styles.container}>

        <header className={styles.header}>Seller Login</header>
        <div className={styles.formOuter}>
                        <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className={styles.formContainer}
                        >
                                  
                 {step === 1 && (
                            <div className={styles.page}>
                                <div className={styles.title}>Enter Email:</div>
                                <input
                                    type="email"
                                    className={styles.input}
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button type="button" className={styles.nextbtn} onClick={generateOTP}>
                                    Send OTP
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className={styles.page}>
                                <div className={styles.title}>Enter OTP:</div>
                                <input
                                    type="text"
                                    className={styles.input}
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                
                                <div className={styles.buttonContainer}>
                                    <button type="button" className={styles.prevbtn} onClick={() => setStep(1)}>
                                        Back
                                    </button>
                                    <button type="button" className={styles.nextbtn} onClick={verifyOTP}>
                                        Login
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                    <motion.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className={styles.animationContainer}
                    >
                        <Lottie
                            animationData={existingSellerAnimation}
                            style={{ width: "600px", height: "600px", marginTop: "60px" }}
                        />
                    </motion.div>

        </div>
        </div>
        </>
};


export default SellerLogin;
