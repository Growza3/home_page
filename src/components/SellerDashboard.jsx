import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStore, FaUsers } from "react-icons/fa";
import { FiShoppingCart, FiDollarSign, FiBox, FiMessageSquare } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import styles from "../styles/sellerDashboard.module.css"; // Keep your styles

const data = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 4500 },
  { month: "Apr", sales: 4200 },
  { month: "May", sales: 5000 },
  { month: "Jun", sales: 5500 },
];

const SellerDashboard = () => {
  const [seller, setSeller] = useState(null);
  const navigate = useNavigate();
  const { sellerId } = useParams(); // ✅ Get sellerId from URL

  useEffect(() => {
    if (!sellerId) {
      navigate("/SellerSignup"); // Redirect if not authenticated
      return;
    }

    const fetchSellerData = async () => {
      try {
          const response = await fetch(`http://localhost:5000/api/sellers/${sellerId}`);
          const data = await response.json();
          if (data.success) {
              setSeller(data.seller);
          } else {
              alert("Seller not found.");
              navigate("/SellerSignup");
          }
      } catch (error) {
          console.error("Error fetching seller data:", error);
          navigate("/SellerSignup");
      }
  };

  fetchSellerData();
}, [sellerId, navigate]);


  if (!seller) return <h2 className={styles.loading}>Loading...</h2>;

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <h2 className={styles.dashboardTitle}>Seller Dashboard</h2>
        <ul className={styles.sidebarMenu}>
          <li>Overview</li>
          <li>Shipment</li>
          <li>My Shipment</li>
          <li>Mass Ship</li>
          <li>Orders</li>
          <li>Products</li>
          <li>Customers</li>
          <li>Promotions</li>
          <li>Sales & Data</li>
        </ul>
        <div className={styles.visitStore}>
          <FaStore className={styles.storeIcon} />
          <button>Visit Store</button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <h2 className={styles.greeting}>
          Welcome, <span className={styles.highlight}>{seller.username}!</span>
        </h2>

        <div className={styles.dashboardOverview}>
          {/* Sales Chart */}
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#4CAF50" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* To-Do List */}
          <div className={styles.todoList}>
            <h3>To Do List</h3>
            <ul>
              <li>Upload 4 new products</li>
              <li>15 products in processing</li>
              <li>25 shipments pending</li>
              <li>5 sold-out products</li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className={styles.statsSection}>
          <div className={styles.statItem}>
            <FiShoppingCart className={styles.icon} />
            <p>Total Orders</p>
            <h3>240</h3>
          </div>
          <div className={styles.statItem}>
            <FiDollarSign className={styles.icon} />
            <p>Total Earnings</p>
            <h3>$8,345.50</h3>
          </div>
          <div className={styles.statItem}>
            <FiBox className={styles.icon} />
            <p>Products Sold</p>
            <h3>320</h3>
          </div>
          <div className={styles.statItem}>
            <FiMessageSquare className={styles.icon} />
            <p>Customer Messages</p>
            <h3>85</h3>
          </div>
          <div className={styles.statItem}>
            <FaUsers className={styles.icon} />
            <p>Active Users</p>
            <h3>3,506</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
