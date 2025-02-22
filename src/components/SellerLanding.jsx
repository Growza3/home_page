import { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react";
import farmingAnimation from "../assets/lottie/farmer12.json";
import organicBanner from "../assets/images/farm1.jpg";
import organicGrowth from "../assets/images/aitomato.jpg";
import sellerSupport from "../assets/images/farmer1.png";
import fastDelivery from "../assets/images/delivery.jpg";
import organicMarketplace from "../assets/images/garden.jpg";
import "../styles/SellerLanding.css";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const SellerLandingEffects = () => {
    useEffect(() => {
        const handleScroll = () => {
            document.querySelectorAll(".section").forEach((section) => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop < window.innerHeight * 0.85) {
                    section.classList.add("reveal");
                }
            });

            document.querySelectorAll(".fade-in, .zoom-in, .blur-effect, .slide-left, .slide-right").forEach((el) => {
                const elementTop = el.getBoundingClientRect().top;
                if (elementTop < window.innerHeight * 0.85) {
                    el.classList.add("visible");
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Trigger on page load

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="seller-landing-effects">
            <header className="hero">
                <motion.img 
                    src={organicBanner} 
                    alt="Organic Marketplace" 
                    className="hero-bg fade-in" 
                    animate={{ scale: [1, 1.1] }} 
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} 
                />
                <motion.div 
                    className="hero-content" 
                    initial={{ opacity: 0, y: -50 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 1 }}
                >
                    <h1>Start Selling Organic Products with Ease</h1>
                    <p>Join a trusted platform designed for organic sellers.</p>
                </motion.div>
            </header>

            {/* Lottie Animation */}
            <div className="lottie-container">
                <Lottie animationData={farmingAnimation} loop={true} className="lottie-animation" />
            </div>

            <section className="section-container">
                {/* Organic Growth */}
                <div className="section">
                    <motion.img 
                        src={organicGrowth} 
                        alt="Organic Growth" 
                        className="section-img fade-in" 
                        animate={{ scale: [1, 1.05] }} 
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
                    />
                    <div className="section-text">
                        <h2>Boost Your Sales</h2>
                        <p>Our platform connects you with thousands of health-conscious buyers looking for fresh, organic produce.</p>
                        <p>Get real-time insights on trending organic products to maximize your revenue.</p>
                        <p>Leverage our marketing tools to enhance your reach and grow your business faster.</p>
                    </div>
                </div>

                {/* Seller Support */}
                <div className="section">
                    <div className="section-text">
                        <h2>24/7 Seller Support</h2>
                        <p>Our dedicated support team is available round the clock to assist you in managing orders, returns, and customer queries.</p>
                        <p>Get personalized business growth advice and exclusive seller benefits.</p>
                        <p>Stay stress-free with a seamless selling experience tailored to organic vendors.</p>
                    </div>
                    <motion.img 
                        src={sellerSupport} 
                        alt="Seller Support" 
                        className="section-img fade-in" 
                        animate={{ scale: [1, 1.05] }} 
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
                    />
                </div>

                {/* Fast Delivery */}
                <div className="section">
                    <motion.img 
                        src={fastDelivery} 
                        alt="Fast Delivery" 
                        className="section-img fade-in" 
                        animate={{ scale: [1, 1.05] }} 
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
                    />
                    <div className="section-text">
                        <h2>Seamless Logistics</h2>
                        <p>We handle the entire shipping and delivery process, ensuring your products reach customers on time.</p>
                        <p>Partner with our reliable logistics network to provide fast and efficient deliveries.</p>
                        <p>Focus on farming while we take care of the transportation and customer satisfaction.</p>
                    </div>
                    <div className="cta-container">
                    <Link to="/SellerSignup" className="cta-button">Start Selling</Link>
</div>

                </div>
            </section>
        </div>
    );
};

export default SellerLandingEffects;