import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import styles from "../styles/ProductCarousel.module.css"; // Import Module CSS

const ProductCarousel = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        fetch("http://localhost:5000/api/approved-products")
            .then((res) => res.json())
            .then((data) => {
                console.log("Fetched Products:", data); // ✅ Log API response
                setProducts(Array.isArray(data) ? data : []);
            })
            .catch((error) => console.error("Error:", error));
    }, []);
    

    return (
        <Swiper effect="fade" autoplay={{ delay: 3000 }} modules={[EffectFade, Autoplay]} loop className={styles.carousel}>
            {products.map((product) => (
                <SwiperSlide key={product._id}>
                    <div className={styles.productCard}>
                        <Swiper
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000 }}
                            loop
                            modules={[Navigation, Pagination, Autoplay]}
                            className={styles.productImageSlider}
                        >
                            {product.images?.length > 0 ? (
    product.images.map((image, index) => (
        <SwiperSlide key={index}>
            <img src={`http://localhost:5000/uploads/${image}`}
                alt={`${product.name} ${index + 1}`} 
                className={styles.productImage} 
                onError={(e) => console.error("Image Load Error:", e.target.src)} 
            />
        </SwiperSlide>
    ))
) : (
    <p>No images available</p>
)}

                        </Swiper>
                        <div className={styles.details}>
                            <h2 className={styles.title}>{product.name}</h2>
                            <h3 className={styles.price}>${product.price}</h3>
                            <div className={styles.buttonGroup}>
                                <button className={styles.addButton}>Add to Cart</button>
                                <button 
                                    className={styles.viewMoreButton}
                                    onClick={() => navigate(`/product/${product._id}`)}
                                >
                                    View More
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ProductCarousel;
