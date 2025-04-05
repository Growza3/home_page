import React, { useState } from "react";
import "../styles/SellerSignup.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import existingSellerAnimation from "../assets/lottie/Signin.json"; // Replace with actual JSON file path
import newSellerAnimation from "../assets/lottie/Signup2.json"; // Replace with actual JSON file path
import { motion } from "framer-motion";

const SellerSignup = () => {
    const [userType, setUserType] = useState(null);
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState({});
    const [certificate, setCertificate] = useState(null);

    const navigate = useNavigate();

    const handleUserSelection = (type) => {
        if (type === "existing") {
            navigate("/SellerLogin");
        } else {
            setUserType("new");
        }
    };

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);
    const validateUsername = (username) => username.length >= 4;

    const generateOTP = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data.success) alert("OTP sent to your email!");
            else alert(data.message);
        } catch (error) {
            alert("Failed to send OTP. Try again.");
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
            if (!data.success) {
                setErrors({ otp: "Invalid OTP, please try again" });
                return false;
            }
            return true;
        } catch (error) {
            setErrors({ otp: "Failed to verify OTP" });
            return false;
        }
    };

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

    const nextStep = async () => {
        setErrors({});

        if (step === 1) {
            if (!validateEmail(email)) {
                toast.error("Invalid Email Formate", {
                    position: "top-right",
                    autoClose: 2000,
                    closeButton: false,
                });
                return;
            }

            const emailExists = await checkEmailExists(email);
            if (emailExists) {
                toast.error("Email is already registered. Try to login...", {
                    position: "top-right",
                    autoClose: 2000,
                    closeButton: false,
                });
                setTimeout(() => navigate("/SellerSignup"), 2000);
                return;
            }

            await generateOTP();
        }

        if (step === 2) {
            const isValidOtp = await verifyOTP();
            if (!isValidOtp) return;
        }

        if (step === 3 && !validatePhone(phone)) {
            toast.error("Enter a valid 10-digit Phone Number", {
                    position: "top-right",
                    autoClose: 2000,
                    closeButton: false,
                });
            return;
        }

        if (step === 4 && !validateUsername(username)) {
            toast.error("Username must be of atleast 4 characters", {
                position: "top-right",
                autoClose: 2000,
                closeButton: false,
            });
            return;
        }

        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const handleCertificateChange = (e) => {
        setCertificate(e.target.files[0]);
    };

    const handleSubmit = async () => {
        setErrors({});
        
        if (!certificate) {
            toast.error("Please upload an organic certification file", {
                position: "top-right",
                autoClose: 2000,
                closeButton: false,
            });
            return;
        }

        const formData = new FormData();
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("username", username);
        formData.append("certificate", certificate);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/complete-signup`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data.success) {
                alert("Signup Complete!");
                localStorage.setItem("sellerEmail", data.seller.email);
                navigate("/dashboard");
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Signup failed. Try again.");
        }
    };

    return (
        <div className="container">
            <ToastContainer />

            {!userType ? (
                <div className="auth-container">
                <div className="auth-section">
                    {/* Signup Section - Left */}
                    <motion.div 
                        initial={{ x: "-100%", opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }} 
                        transition={{ duration: 0.8 }}
                        className="signup-section"
                    >
                        <h2>New Seller?</h2>
                        <Lottie animationData={newSellerAnimation} style={{ width: "420px", height: "420px" }}  />
                        <button onClick={() => handleUserSelection("new")} className="signup-btn">Sign Up</button>
                    </motion.div>
            
                    {/* Signin Section - Right */}
                    <motion.div 
                        initial={{ x: "100%", opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }} 
                        transition={{ duration: 0.8 }}
                        className="signin-section"
                    >
                        <h2>Already a Seller?</h2>
                        <Lottie animationData={existingSellerAnimation} style={{ width: "320px", height: "320px" , marginTop: "60px" }}  />
                        <button onClick={() => handleUserSelection("existing")} className="signin-btn">Sign In</button>
                    </motion.div>
                </div>
            </div>
            
            ) : (
                <div className="form-outer">
                <div className="auth-signup">
                    {/* Animation coming from the right */}
                    <motion.div 
                        initial={{ x: "100%", opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }} 
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="title1">Welcome to the Growza Seller Platform!</h2>
                        <Lottie animationData={newSellerAnimation} style={{ width: "600px", height: "600px" }} />
                    </motion.div>
            
                    {/* Form coming from the left */}
                    <motion.form
                        initial={{ x: "-100%", opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }} 
                        transition={{ duration: 0.8 }}
                    >
                        {step === 1 && (
                            <div className="page">
                                <div className="title">Enter Email:</div>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p className="error">{errors.email}</p>}
                                <button type="button" onClick={nextStep} className="nextbtn">
                                    Next
                                </button>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="page">
                                <div className="title">Verify OTP:</div>
                                <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                {errors.otp && <p className="error">{errors.otp}</p>}
                                <button type="button"  onClick={nextStep} className="nextbtn">Verify</button>
                                <button type="button"  onClick={prevStep} className="prevbtn">Previous</button>
                            </div>
                        )}
                        {step === 3 && (
                            <div className="page">
                                <div className="title">Enter Phone Number:</div>
                                <input type="tel" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                {errors.phone && <p className="error">{errors.phone}</p>}
                                <button type="button" onClick={nextStep} className="nextbtn">Next</button>
                                <button type="button" onClick={prevStep} className="prevbtn">Previous</button>
                            </div>
                        )}
                        {step === 4 && (
                            <div className="page">
                                <div className="title">Set Username:</div>
                                <input type="text" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                {errors.username && <p className="error">{errors.username}</p>}
                                <button type="button"  onClick={nextStep} className="nextbtn">Next</button>
                                <button type="button"  onClick={prevStep} className="prevbtn">Previous</button>
                            </div>
                        )}
                        {step === 5 && (
                            <div className="page">
                                <div className="title">Upload Organic Certification:</div>
                                <input type="file" accept=".pdf,.jpg,.png" onChange={handleCertificateChange} />
                                {errors.certificate && <p className="error">{errors.certificate}</p>}
                                <button type="button"  onClick={handleSubmit} className="nextbtn">Submit</button>
                                <button type="button"  onClick={prevStep} className="prevbtn">Previous</button>
                            </div>
                        )}
                    </motion.form>
                </div>
            </div>            
            )}
        </div>
    );
};

export default SellerSignup;
