import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Carousel.module.css";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";
import p6 from "../assets/p6.jpg";
import p7 from "../assets/p7.jpg";
import p8 from "../assets/image1.jpg";
import p9 from "../assets/image2.png";

const initialProducts = [
  { img: p1, title: "Descriptive Title", subtitle: "Date and Duration" },
  { img: p2, title: "Descriptive Title", subtitle: "Date and Duration" },
  { img: p3, title: "Descriptive Title", subtitle: "Date and Duration" },
  { img: p4, title: "Descriptive Title", subtitle: "Date and Duration" },
  { img: p5, title: "Descriptive Title", subtitle: "Date and Duration" },
  { img: p6, title: "Descriptive Title", subtitle: "Date and Duration" },
  { img: p7, title: "Descriptive Title", subtitle: "Date and Duration" },
  { img: p8, title: "Descriptive Title", subtitle: "Date and Duration" },
  { img: p9, title: "Descriptive Title", subtitle: "Date and Duration" }
];

const Carousel = () => {
  const carouselRef = useRef(null);
  const [productList, setProductList] = useState(initialProducts);

  useEffect(() => {
    const setCarouselWidth = () => {
      if (
        carouselRef.current && 
        carouselRef.current.querySelector(`.${styles.carouselItem}`)
      ) {
        const itemWidth = carouselRef.current.querySelector(
          `.${styles.carouselItem}`
        ).offsetWidth;
        const marginRight = 10;
        const visibleCards = 7;
        const containerWidth = (itemWidth + marginRight) * visibleCards;

        carouselRef.current.style.width = `${containerWidth}px`;
      }
    };

    setCarouselWidth();
    window.addEventListener("resize", setCarouselWidth);

    return () => window.removeEventListener("resize", setCarouselWidth);
  }, [productList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (
        carouselRef.current &&
        carouselRef.current.querySelector(`.${styles.carouselItem}`)
      ) {
        const itemWidth = carouselRef.current.querySelector(
          `.${styles.carouselItem}`
        ).offsetWidth;
        const marginRight = 10; // Margin between items
        const totalItems = productList.length; // Number of total products
        const totalWidth = (itemWidth + marginRight) * totalItems; // Total width of all items including margins
        const scrollAmount = itemWidth + marginRight; // Scroll per item

        // Scroll by one item width at a time
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });

        // If we reach the end of the carousel, reset scroll to 0
        if (
          carouselRef.current.scrollLeft + carouselRef.current.clientWidth >=
          totalWidth - 1 // Ensure the last item can fully show before reset
        ) {
          setTimeout(() => {
            carouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
          }, 3000); // Delay the reset to ensure the last item is fully visible
        }
      }
    }, 3000); // Change slides every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [productList]);

  return (
    <section className={styles.carousel}>
      <h2 className={styles.categoriesTitle}>Our Products</h2>
      <button
        className={`${styles.carouselButton} ${styles.left}`}
        onClick={() => {
          if (
            carouselRef.current &&
            carouselRef.current.querySelector(`.${styles.carouselItem}`)
          ) {
            const itemWidth = carouselRef.current.querySelector(
              `.${styles.carouselItem}`
            ).offsetWidth;
            const marginRight = 10;
            const scrollAmount = itemWidth + marginRight;
            carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
          }
        }}
      >
        &#10094;
      </button>
      <div className={styles.carouselContainer} ref={carouselRef}>
        {productList.map((product, index) => (
          <div key={index} className={styles.carouselItem}>
            <img
              className={styles.carouselItemImg}
              src={product.img}
              alt={`Product ${index + 1}`}
            />
            <div className={styles.carouselItemDetails}>
              <h3 className={styles.carouselItemDetailsTitle}>{product.title}</h3>
              <span className={styles.carouselItemDetailsSubtitle}>
                {product.subtitle}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button
        className={`${styles.carouselButton} ${styles.right}`}
        onClick={() => {
          if (
            carouselRef.current &&
            carouselRef.current.querySelector(`.${styles.carouselItem}`)
          ) {
            const itemWidth = carouselRef.current.querySelector(
              `.${styles.carouselItem}`
            ).offsetWidth;
            const marginRight = 10;
            const scrollAmount = itemWidth + marginRight;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
          }
        }}
      >
        &#10095;
      </button>
    </section>
  );
};

export default Carousel;
