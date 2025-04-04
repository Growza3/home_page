import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/ProductList.module.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const fetchApprovedProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/approved");
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          console.error("Failed to fetch approved products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchApprovedProducts();
  }, []);

  return (
    <section className={styles.productSection}>
      
      <h2 className={styles.sectionTitle}>Available Organic Products</h2>
      <div className={styles.productContainer}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className={styles.productItem}>
              <img src={`http://localhost:5000${product.imageUrl}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ₹{product.price}</p>
              <p>Stock: {product.stock}</p>
            </div>
          ))
        ) : (
          <p>No approved products available.</p>
        )}
      </div>
     
    </section>
  );
};

export default ProductList;
