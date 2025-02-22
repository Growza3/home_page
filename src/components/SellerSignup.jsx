import React, { useState } from "react";
import "../styles/SellerSignup.css";
import { useNavigate } from "react-router-dom";

const SellerSignup = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);
    const validateUsername = (username) => username.length >= 4;

    const generateOTP = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (data.success) alert("OTP sent to your email!");
            else alert(data.message);
        } catch (error) {
            console.error("Error sending OTP:", error);
            alert("Failed to send OTP. Try again.");
        }
    };

    const verifyOTP = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
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
            console.error("Error verifying OTP:", error);
            setErrors({ otp: "Failed to verify OTP" });
            return false;
        }
    };

    const nextStep = async () => {
        setErrors({});
        let validationErrors = {};

        if (step === 1 && !validateEmail(email)) {
            setErrors({ email: "Enter a valid email address" });
            return;
        }

        if (step === 1) await generateOTP();

        if (step === 2) {
            const isValidOtp = await verifyOTP();
            if (!isValidOtp) return;
        }
        
        if (step === 3 && !validatePhone(phone)) {
            setErrors({ phone: "Enter a valid 10-digit phone number" });
            return;
        }

        if (step === 4 && !validateUsername(username)) {
            setErrors({ username: "Username must be at least 4 characters" });
            return;
        }

        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/complete-signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, phone, username }),
            });
            const data = await response.json();
            if (data.success) {alert("Signup Complete!");
                localStorage.setItem("sellerId", data.seller._id); // ✅ Store seller ID
            navigate(`/dashboard/${data.seller._id}`); 
            }
            else alert(data.message);
        } catch (error) {
            console.error("Error completing signup:", error);
            alert("Signup failed. Try again.");
        }
    };

    return (
        <div className="container">
            <header>Seller Signup</header>
            <div className="progress-bar">
                {["Email", "OTP", "Phone", "Username"].map((label, index) => (
                    <div key={index} className={`step ${step >= index + 1 ? "active" : ""}`}>
                        <p>{label}</p>
                        <div className="bullet"><span>{index + 1}</span></div>
                    </div>
                ))}
            </div>
            <div className="form-outer">
                <form>
                    {step === 1 && (
                        <div className="page">
                            <div className="title">Enter Email:</div>
                            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {errors.email && <p className="error">{errors.email}</p>}
                            <button type="button" onClick={nextStep}>Next</button>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="page">
                            <div className="title">Verify OTP:</div>
                            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                            {errors.otp && <p className="error">{errors.otp}</p>}
                            <button type="button" className="prev" onClick={prevStep}>Previous</button>
                            <button type="button" className="next" onClick={nextStep}>Verify</button>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="page">
                            <div className="title">Enter Phone Number:</div>
                            <input type="tel" placeholder="Enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            {errors.phone && <p className="error">{errors.phone}</p>}
                            <button type="button" className="prev" onClick={prevStep}>Previous</button>
                            <button type="button" className="next" onClick={nextStep}>Next</button>
                        </div>
                    )}
                    {step === 4 && (
                        <div className="page">
                            <div className="title">Set Username:</div>
                            <input type="text" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            {errors.username && <p className="error">{errors.username}</p>}
                            <button type="button" className="prev" onClick={prevStep}>Previous</button>
                            <button type="button" className="submit" onClick={handleSubmit}>Submit</button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SellerSignup;
