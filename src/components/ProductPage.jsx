import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import ProductCard from "./ProductCard";
import styles from "../styles/ProductPage.module.css";
import farm from "../assets/images/farming.mp4";
import { useNavigate } from "react-router-dom";
import { FaMicrophone } from "react-icons/fa"; // 🎤 Import Mic Icon

const ProductPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Track selected category
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("accessToken");
    const email = params.get("email");

    if (token && email) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("userEmail", email);
      
      // Clean URL after storing data
      navigate("/ProductPage", { replace: true });
    }
  }, [navigate]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/products");
        console.log("Fetched Data:", response.data);
if (response.data) {
    const jsonData = JSON.stringify(response.data);
}


        if (response.data.success && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
          setFilteredProducts(response.data.products);

          const uniqueCategories = [
            "All",
            ...new Set(response.data.products.map((product) => product.category)),
          ];
          setCategories(uniqueCategories);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("Selected Category:", selectedCategory); // Debugging log
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === selectedCategory);
      console.log("Filtered Products:", filtered); // Debugging log
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);
  useEffect(() => {
    let updatedProducts = products;
  
    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
  
    if (searchQuery.trim() !== "") {
      const formattedQuery = searchQuery
        .toLowerCase()
        .replace(/\.$/, "") // Remove trailing dot
        .replace(/\s+/g, " ") // Normalize spaces
        .replace(/\s*-\s*/g, "-") // Ensure dashes stay formatted
        .trim();
  
      updatedProducts = updatedProducts.filter((product) => {
        const productName = product.name.toLowerCase().replace(/\s+/g, ""); // Remove spaces
        const productCategory = product.category.toLowerCase().replace(/\s+/g, "");
        const categoryWithDash = product.category.toLowerCase().replace(/\s+/g, "-"); // Convert spaces to dashes
    const categoryWithoutDash = product.category.toLowerCase().replace(/-/g, " "); // Convert dashes to spaces

  
        return (
          product.name.toLowerCase().includes(formattedQuery) ||
          product.category.toLowerCase().includes(formattedQuery) ||
          productName.includes(formattedQuery.replace(/\s+/g, "")) || // Handle "ladyfinger" vs "lady finger"
          productCategory.includes(formattedQuery.replace(/\s+/g, ""))||
          categoryWithDash.includes(formattedQuery) || // Handle "dried-fruits" case
          categoryWithoutDash.includes(formattedQuery) // Handle "dried fruits" case
        );
      });
    }
  
    setFilteredProducts(updatedProducts);
  }, [selectedCategory, searchQuery, products]);
  
  // 🎤 Improved Voice Search
  const handleVoiceSearch = () => {
    const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();
  
    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript
        .replace(/\.$/, "") // Remove trailing dot
        .replace(/\s+/g, " ") // Normalize spaces
        .trim();
  
      console.log("Recognized Speech:", transcript); // Debugging log
      setSearchQuery(transcript);
    };
  
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  };
  
  
  return (
    <>

      {/* Video Section */}
      <section className={styles.videoSection}>
        <video autoPlay loop muted>
          <source src={farm} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.videoOverlay}>Experience Organic Farming</div>
      </section>
      

      {/* Main Content with Background Image */}
      <div className={styles.mainContent}>
        {/* Category Section */}
        <section className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>Shop by Category</h2>
          <div className={styles.categoryContainer}>
            {categories.map((category, index) => (
              <div
                key={index}
                className={`${styles.categoryItem} ${selectedCategory === category ? styles.activeCategory : ""}`}
                onClick={() => {
                  console.log("Clicked Category:", category); // Debugging log
                  setSelectedCategory(category);
                }}
                style={{ cursor: "pointer" }} // Ensure it's clickable
              >
                <img src={`/images/${category.toLowerCase()}.jpg`} alt={category} />
                <p>{category}</p>
              </div>
            ))}
          </div>
            {/* 🔍 Search Bar with Voice Search 🎤 */}
            <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search by name or category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaMicrophone className={styles.micIcon} onClick={handleVoiceSearch} />
          </div>
        </section>

        {/* Product Section */}
        <ProductCard productList={filteredProducts} />

      </div>
    </>
  );
};

export default ProductPage;
