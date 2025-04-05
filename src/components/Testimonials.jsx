import React, { useEffect, useState } from "react";
import styles from "../styles/Testimonials.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import r1 from "../assets/images/r1.png";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [profileImage, setProfileImage] = useState(r1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/reviews/auth`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        setReviews(data);

        if (data.length > 0) {
          updateProfileImage(0, data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const updateProfileImage = (index, data) => {
    if (data.length > 0 && data[index]) {
      const trimmedEmail = data[index].email.split("@")[0];
      const userImage = `${import.meta.env.VITE_API_BASE_URL}/uploads/${trimmedEmail}.jpg`;

      // Trigger animation before changing image
      setAnimate(true);

      // Wait for animation duration before setting new image
      setTimeout(() => {
        setProfileImage(userImage);
        setAnimate(false);
      }, 200); // Matches CSS animation time
    } else {
      setProfileImage(r1);
    }
  };

  return (
    <div className={styles.testimonialSection}>

            {/* Heading Section - Stays Centered */}
            <h3 className={styles.testimonialTitle}>
              Testi<span className={styles.highlight}>monials</span></h3>
            <h1 className={styles.testimonialHeading}>
                People says about <span className={styles.highlight}>Agrarium</span>
            </h1>


      <div className={styles.testimonialContainer}>
        {/* Heading moved inside the container */}

        {/* Left Side - Dynamic Image with Animation */}
        <div className={`${styles.imageContainer} ${animate ? styles.slideOut : ""}`}>
        <span className={styles.quote2}>&ldquo;</span>
          <img
            src={profileImage}
            alt="Customer Feedback"
            className={styles.staticImage}
          />
          <span className={styles.quote}>&ldquo;</span>
        </div>

        {/* Right Side - Reviews */}
        <div className={styles.reviewContainer}>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className={styles.reviewSwiper}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
              updateProfileImage(swiper.activeIndex, reviews);
            }}
          >
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <SwiperSlide key={review._id} className={styles.slide}>
                  <div className={styles.reviewCard}>
                    <div className={styles.reviewContent}>
                      
                      <p className={styles.text}>{review.review}</p>
                      <span className={styles.author}>
                        <strong>{review.email.split("@")[0]}</strong>
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <p className={styles.noReviews}>No reviews available</p>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
