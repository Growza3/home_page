import React, { useState } from "react";
import ProductItem from "./ProductItem";
import styles from "../styles/ProductList.module.css";

const ProductItem = ({ products, onUpdate, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;

  // Get the current page's products
  const paginatedProducts = products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Handlers for Next and Previous buttons
  const nextPage = () => {
    if ((currentPage + 1) * itemsPerPage < products.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.productListContainer}>
      {paginatedProducts.map((product) => (
        <ProductItem key={product._id} product={product} onUpdate={onUpdate} onDelete={onDelete} />
      ))}

      {/* Pagination Buttons */}
      <div className={styles.pagination}>
        <button onClick={prevPage} disabled={currentPage === 0}>
          ⬅️ Previous
        </button>
        <button onClick={nextPage} disabled={(currentPage + 1) * itemsPerPage >= products.length}>
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
