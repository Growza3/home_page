import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "../styles/sellerDashboard.module.css";
import FlippingCard from "../components/FlippingCard";
import SellerProfilePopup from "../components/SellerProfilePopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import certificate from "../assets/images/certifies-stamp.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const SellerDashboard = () => {
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeSection, setActiveSection] = useState("overview");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false); // Show/hide review form
  const [reviewText, setReviewText] = useState(""); // Store review text


  const navigate = useNavigate();
  const { sellerId } = useParams();

  useEffect(() => {
    let storedEmail = localStorage.getItem("sellerEmail");

    if (!storedEmail) {
      navigate("/SellerSignup");
      return;
    }

    const fetchSellerData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/sellers/email/${storedEmail}`);
        if (!response.ok) {
          console.error("HTTP Error:", response.status);
          throw new Error(`Server responded with ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setSeller(data.seller);
        } else {
            toast.error("Seller Not Found", {
            position: "top-right",
            autoClose: 3000,
            closeButton: false,
          });
          navigate("/SellerSignup");
        }
      } catch (error) {
        console.error("Error fetching seller data:", error);
        navigate("/SellerSignup");
      }
    };
    fetchSellerData();
  }, [navigate]);  // ✅ Correct useEffect
 
  useEffect(() => {
    let storedEmail = localStorage.getItem("sellerEmail");
    if (!storedEmail) return;

    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/seller/${storedEmail}`);
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    
  fetchProducts();
}, []);  // ✅ Anoth

useEffect(() => {
  let storedEmail = localStorage.getItem("sellerEmail");
  if (!storedEmail) return;
      
      const fetchOrders = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/orders/${storedEmail}`);
          const data = await response.json();
    
          if (data.success) {
            setOrders(data.orders); // Ensure this updates the state
          } else {
            console.error("Failed to fetch orders:", data.message);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
    
      
  fetchOrders();
}, []);  
    
  
  console.log(orders);
  
  useEffect(() => {
    fetch("http://localhost:5000/api/sales")
        .then((res) => res.json())
        .then((data) => {
            if (data.length === 0) {
                setMessage("No sales data available");
            } else {
                setSalesData(data);
            }
        })
        .catch((error) => {
            console.error("Error fetching sales data:", error);
            setMessage("Error loading sales data");
        });

  }, []);
    

  const handleSubmitReview = async () => {
    const sellerEmail = localStorage.getItem("sellerEmail");
    if (!reviewText.trim()) {
        alert("Review cannot be empty!");
        return;
    }

    try {
        console.log("📤 Sending review to server...");

        const response = await fetch("http://localhost:5000/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: sellerEmail, review: reviewText.trim() }),
        });

        const responseText = await response.text(); // Log raw response
        console.log("🛜 Raw Response:", responseText);

        const data = JSON.parse(responseText);  // Convert to JSON safely
        console.log("📥 Parsed Response data:", data);

        if (response.ok ) {  
            alert("✅ Review submitted successfully!");
            setReviewText("");
            setShowReviewForm(false);
        } else {
            alert(data.message || "❌ Failed to submit review.");
        }
    } catch (error) {
        console.error("⚠ Error submitting review:", error);
        alert("An error occurred. Please try again.");
    }
};


  

  const handleLogout = () => {
    localStorage.removeItem("sellerEmail");
    navigate("/SellerSignup");
  };

  if (!seller) return <h2 className={styles.loading}>Loading...</h2>;

  return (
    <div className={styles.dashboardContainer}>

      <div className={styles.sidebar}>
        <h2 className={styles.dashboardTitle}>Seller Dashboard</h2>
        <ul className={styles.sidebarMenu}>
  <li onClick={() => setActiveSection("overview")}>
    <i className="fas fa-user"></i> Profile
  </li>
  <li onClick={() => setActiveSection("orders")}>
    <i className="fas fa-box"></i> Orders
  </li>
  <li onClick={() => setActiveSection("products")}>
    <i className="fas fa-shopping-basket"></i> Products
  </li>
  <li onClick={() => setActiveSection("customers")}>
    <i className="fas fa-users"></i> Customers
  </li>
  <li onClick={() => setActiveSection("sales")}>
    <i className="fas fa-chart-line"></i> Sales & Data
  </li>
  <li onClick={() => setShowReviewForm(true)}>
    <i className="fas fa-star"></i> Write a Review
  </li>
</ul>

<li>
  <Link to="/addproductform">
    <i className="fas fa-plus-circle"></i> Add Product
  </Link>
</li>

<button className={styles.logoutButton} onClick={handleLogout}>
  <i className="fas fa-sign-out-alt"></i> Logout
</button>

      </div>

      <div className={styles.mainContent}>
      <h2 className={styles.greeting}>
  Welcome, <span className={styles.highlight}>{seller.username}</span>
  {seller.isCertified && (
    <img
      src={certificate} // ✅ Add the correct path to your certified image
      alt="Certified Seller"
      className={styles.certifiedStamp}
    />
  )}
</h2>

        {activeSection === "overview" && (
          <div className={styles.productShelf}>
            {products.length > 0 ? (
              products.map((product) => (
                <FlippingCard
                  key={product._id}
                  product={product}
                  onUpdate={(updatedProduct) =>
                    setProducts((prevProducts) =>
                      prevProducts.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
                    )
                  }
                  onDelete={(deletedProductId) =>
                    setProducts((prevProducts) => prevProducts.filter((p) => p._id !== deletedProductId))
                  }
                />
              ))
            ) : (
              <p>No products added yet.</p>
            )}
          </div>
        )}

{activeSection === "orders" && (
  <div className="p-6 bg-gray-100 min-h-screen">
    <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Orders</h3>

    {orders.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-2xl transform hover:-translate-y-1 transition-all"
          >
            <h3 className="text-lg font-semibold text-green-700">Order ID: {order._id}</h3>
            <p className="text-gray-600">Buyer: {order.email}</p>
            <p className="text-gray-800 font-medium">
              Payment Status: <span className="text-green-500">{order.paymentStatus}</span>
            </p>
            <div className="mt-4">
              <h4 className="text-md font-semibold text-gray-700">Products:</h4>
              <ul className="list-disc pl-5 text-gray-600">
                {order.productDetails?.length > 0 ? (
                  order.productDetails.map((product) => (
                    <li key={product._id} className="flex justify-between">
                      <span>{product.name}</span>
                      <span className="text-green-600 font-bold">₹{product.price}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-red-500">No products available</p>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 text-lg text-center">No Orders Found</p>
    )}
  </div>
)}


{activeSection === "sales" && (
          <div className={styles.salesGraph}>
            <h3>Sales Overview</h3>
            {salesData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalSales" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p>No sales data available.</p>
            )}
          </div>
        )}
      

      </div>
{/* Review Form Modal */}
{showReviewForm && (
        <div className={styles.reviewModal}>
          <div className={styles.reviewContent}>
            <h2>Write a Review</h2>
            <textarea
              placeholder="Share your experience..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button onClick={handleSubmitReview}>Submit</button>
            <button onClick={() => setShowReviewForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Profile Popup - ✅ Fixed Placement */}
      {isPopupOpen && (
        <SellerProfilePopup
          seller={seller}
          onUpdate={() => window.location.reload()} // Refresh page on update
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default SellerDashboard;
