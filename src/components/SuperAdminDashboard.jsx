import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUsers, FaStar, FaBox, FaUserShield, FaChartLine, FaContao,FaTimes } from "react-icons/fa";
import styles from "../styles/SuperAdminDashboard.module.css";
import { Line } from "react-chartjs-2";
import WeeklyRevenueChart from "./WeeklyRevenueChart"; // Import the Weekly Revenue Chart
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,LineElement,PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import axios from "axios";



ChartJS.register(CategoryScale, LinearScale, BarElement,LineElement,PointElement, Title, Tooltip, Legend);

const SuperAdminDashboard = () => {
  const [showAdmins, setShowAdmins] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [contactMessages, setContactMessages] = useState([]);
  const[showMessages,setShowMessages]=useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Dashboard");
  const [showTable, setShowTable] = useState(false);
  const [showOrderCharts, setShowOrderCharts] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const [showUserCharts, setShowUserCharts] = useState(false);
  const [dailyRevenueData, setDailyRevenueData] = useState([]);
  const [showReviewPanel, setShowReviewPanel] = useState(true);
  const [reviews, setReviews] = useState([]);
  
const [userStats, setUserStats] = useState({
  totalUsers: 0,
  totalSellers: 0,
  totalBuyers: 0,
});

useEffect(() => {
  fetch("/api/admin/user-stats")
    .then((res) => res.json())
    .then((data) => {
      setUserStats({
        totalUsers: data.totalUsers,
        totalSellers: data.totalSellers,
        totalBuyers: data.totalBuyers,
      });
    });
}, []);

useEffect(() => {
  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/reviews/auth");
      const data = await response.json();
      console.log("Fetched Reviews:", data);

      if (Array.isArray(data)) {
        setReviews(data);
      } else {
        console.error("Invalid reviews data format:", data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  fetchReviews();
}, []);



  const [adminStats, setAdminStats] = useState({
    totalProducts: 0,
    approvedProducts: 0,
    rejectedProducts: 0,
    totalSellers: 0,
    totalBuyers: 0,      // New State: Track Buyers who placed orders
    totalOrders: 0,      // New State: Track total orders
    canceledOrders: 0,   // New State: Track canceled orders
  });

  const admins = [
    { id: 1, name: "Product Manager", icon: <FaBox />, status: "Active" },
    { id: 2, name: "Order Manager", icon: <FaShoppingCart />, status: "Active" },
    { id: 3, name: "User Manager", icon: <FaUserShield />, status: "Active" }
  ];
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
  });

  // Function to fetch required stats
  const fetchStats = async (type) => {
    try {
      let productsRes, sellersRes, ordersRes;

      if (type === "Product Manager") {
        productsRes = await fetch("/api/products");
        sellersRes = await fetch("/api/sellerdata");

           const productsData = await productsRes.json();
      const sellersData = await sellersRes.json();

      console.log("Products Data:", productsData);
      console.log("Sellers Data:", sellersData);

      // Ensure data is an array
      const products = Array.isArray(productsData) ? productsData : productsData.products || [];
      const sellers = Array.isArray(sellersData) ? sellersData : sellersData.sellerdata || [];

      const approvedCount = products.filter((p) => p.status === "approved").length;
      const rejectedCount = products.filter((p) => p.status === "rejected").length;
      const pendingCount = products.filter((p) => p.status === "pending").length;


      setAdminStats({
        totalProducts: products.length,
        totalSellers: sellers.length,
        approvedProducts: approvedCount,
        rejectedProducts: rejectedCount,
        pendingProducts: pendingCount,
      });
        } 
      
      if (type === "User Manager") {
        sellersRes = await fetch("/api/sellerdata");
        ordersRes = await fetch("/api/orders");

        const sellersData = await sellersRes.json();
        const ordersData = await ordersRes.json();

        const buyers = new Set(ordersData.map((order) => order.buyerEmail)); // Unique buyers

        setAdminStats((prev) => ({
          ...prev,
          totalSellers: sellersData.length,
          totalBuyers: buyers.size, // Count unique buyers who placed orders
        }));
      } 
      
      if (type === "Order Manager") {
        ordersRes = await fetch("/api/orders");

        const ordersData = await ordersRes.json();

        setAdminStats((prev) => ({
          ...prev,
          totalOrders: ordersData.length,
          canceledOrders: ordersData.filter((o) => o.status === "Canceled").length,
        }));
      }

      setPopupTitle(type);
      setShowPopup(true);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };
  useEffect(() => {
    if (selectedSection === "Analysis") {
      fetchRevenueData();
    }
    
  }, [selectedSection]);
  useEffect(() => {
    if (selectedSection === "Messages & Notifications") {
      fetchContactMessages();
    }
    
  }, [selectedSection]);
  const fetchRevenueData = async () => {
    try {
      const response = await fetch("/api/revenue");
      const data = await response.json();
      setRevenueData(data);
      const total = data.reduce((sum, entry) => sum + entry.revenue, 0);
      setTotalRevenue(total);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  const fetchContactMessages = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/contact/all");
      const data = await response.json();
      console.log("Fetched Messages:", data); // Check if data is received
      setContactMessages(data);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
    }
  };
  const fetchProductStats = async () => {
    try {
      const productsRes = await fetch("/api/products");
      const productsData = await productsRes.json();
      const products = Array.isArray(productsData) ? productsData : productsData.products || [];

      setAdminStats({
        totalProducts: products.length,
        approvedProducts: products.filter((p) => p.status === "approved").length,
        rejectedProducts: products.filter((p) => p.status === "rejected").length,
        pendingProducts: products.filter((p) => p.status === "pending").length,

      });
    } catch (error) {
      console.error("Error fetching product stats:", error);
    }
  };
  const barChartData = {
    labels: ["Total Products", "Approved Products", "Rejected Products", "Pending Products"],
    datasets: [
      {
        label: "Product Statistics",
        data: [adminStats.totalProducts, adminStats.approvedProducts, adminStats.rejectedProducts, adminStats.pendingProducts],
        backgroundColor: ["#3498db", "#2ecc71", "#e74c3c"],
      },
    ],
  };
  const fetchOrderStats = async () => {
    try {
      const ordersRes = await fetch("/api/orders");
      const ordersData = await ordersRes.json();
      const orders = Array.isArray(ordersData) ? ordersData : ordersData.orders || [];

      const cancelledRes = await fetch("/api/cancel");
      const cancelledData = await cancelledRes.json();
      const cancelledOrders = Array.isArray(cancelledData) ? cancelledData : cancelledData.orders || [];

      setOrderStats({
        totalOrders: orders.length,
        deliveredOrders: orders.filter((o) => o.status === "Delivered").length,
        pendingOrders: orders.filter((o) => o.status === "Pending").length,

        cancelledOrders: cancelledOrders.length,
      });
    } catch (error) {
      console.error("Error fetching order stats:", error);
    }
  };
  const fetchUserStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/user-stats");
      const data = await response.json();
      setUserStats(data);
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };
  const userChartData = {
    labels: ["Sellers", "Buyers"],
    datasets: [
      {
        label: "User Distribution",
        data: [userStats.totalSellers, userStats.totalBuyers],
        backgroundColor: ["#ff6384", "#36a2eb"],
        hoverOffset: 4,
      },
    ],
  };
  

  const orderStats1 = {
    dates: ["2024-04-01", "2024-04-02", "2024-04-03"], // Example dates
    totalOrders: [50, 70, 90], 
    deliveredOrders: [30, 50, 75], 
    cancelledOrders: [5, 10, 15],
  };
  // Ensure totalOrders is dynamically calculated
  orderStats.totalOrders = (orderStats.deliveredOrders || 0) + 
  (orderStats.cancelledOrders || 0) + 
  (orderStats.pendingOrders || 0);
const orderChartData = {
  labels: ["Total Orders", "Delivered Orders", "Cancelled Orders", "Pending Orders"],
  datasets: [
    {
      data: [
        orderStats.totalOrders, 
        orderStats.deliveredOrders, 
        orderStats.cancelledOrders, 
        orderStats.pendingOrders,
      ],
      backgroundColor: ["#f39c12", "#2ecc71", "#e74c3c", "#3498db"], 
      hoverBackgroundColor: ["#e67e22", "#27ae60", "#c0392b", "#2980b9"],
    },
  ],
};
{showUserCharts && (
  <section className={styles.chartsSection}>
    <h3>User Statistics</h3>
    <div className={styles.userChartsContainer}>
      <div 
        className={styles.userChart}  
        onClick={() => {
          setSelectedTable("user");  
          setShowTable(true);
        }}  
        style={{ position: "relative" }}
      >
        <h4>User Breakdown</h4>
        <Pie data={userChartData} /> 
        {/* Total Users Display */}
        <div className={styles.totalUsers} style={{ 
          position: "absolute", 
          bottom: "10px", 
          right: "10px", 
          background: "#fff", 
          padding: "5px 10px", 
          borderRadius: "5px", 
          fontWeight: "bold",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)"
        }}>
          Total Users: {userStats.totalUsers}
        </div>
      </div>
    </div>
  </section>
)}
const toggleAdminStatus = async (index) => {
  const updatedAdmins = [...admins];
  updatedAdmins[index].status = updatedAdmins[index].status === "Active" ? "Blocked" : "Active";
  setAdmins(updatedAdmins);

  // Send update to the database
  try {
    await fetch(`/api/admins/updateStatus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adminId: updatedAdmins[index].id, 
        status: updatedAdmins[index].status
      })
    });
  } catch (error) {
    console.error("Error updating admin status:", error);
  }
};





    return (
      <div className={styles.dashboardContainer}>
              
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.profileSection}>
            <h3>Super Admin</h3>
          </div>
          <nav className={styles.navMenu}>
            <ul>
              <li onClick={() => setSelectedSection("Dashboard")} className={selectedSection === "Dashboard" ? styles.active : ""}><FaBox /> Dashboard</li>
              <li onClick={() => setSelectedSection("Analysis")} className={selectedSection === "Analysis" ? styles.active : ""}><FaChartLine /> Analysis</li>
              <li onClick={() => setSelectedSection("Messages & Notifications")} className={selectedSection === "Messages & Notifications" ? styles.active : ""}><FaContao /> Messages & Notifications</li>
              <li onClick={() => setSelectedSection("Reviews")} className={selectedSection === "Reviews" ? styles.active : ""}><FaStar /> Reviews</li>

             

      
              <li className={styles.logout}>Log out</li>
            </ul>
          </nav>
        </aside>
        </div>

        <main className={styles.mainContent}>
          <header className={styles.header}>
            <h2>Welcome back, Admin!</h2>
            <p>Today is {new Date().toDateString()}</p>
          </header>
          {selectedSection === "Dashboard" && (
          <section className={styles.dashboardCards}>
            {admins.map((admin) => (
              <div key={admin.id} className={styles.card}   onClick={() => { 
                 if (admin.name === "Product Manager") { 
    setShowCharts(true); 
    setShowOrderCharts(false);
    setShowUserCharts(false); // Reset User Chart
    fetchProductStats(); 
  } 
  if (admin.name === "Order Manager") {
    setShowOrderCharts(true);
    setShowCharts(false);
    setShowUserCharts(false); // Reset User Chart
    fetchOrderStats();
  }
  if (admin.name === "User Manager") {
    setShowUserCharts(true);
    setShowCharts(false);
    setShowOrderCharts(false); // Reset Order Chart
    fetchUserStats();
  }
              }}
            >
              <div className={styles.cardIcon}>{admin.icon}</div>
              <h3>{admin.name}</h3>
            </div>
          ))}
          </section>
        )}

          {showCharts && selectedSection === "Dashboard" && (
            <section className={styles.chartsSection}>
              <h3>Product Statistics</h3>
              <div className={styles.chartsContainer}>
                <Bar data={barChartData} />
              </div>
            </section>
          )}
            
            {showOrderCharts && selectedSection === "Dashboard" &&(
  <section className={styles.chartsSection}>
    <h3>Order Statistics</h3>
    <div className={styles.orderChartsContainer}>
      <div className={styles.orderChart}  onClick={() => {
    setSelectedTable("total orders");  // Set selectedTable to match order categories
    setShowTable(true);
  }}  style={{ position: "relative" }}>
        <h4>Order Breakdown</h4>
        <Pie data={orderChartData} />
        {/* Total Products Display */}
        <div className={styles.totalProducts} style={{ 
          position: "absolute", 
          bottom: "10px", 
          right: "10px", 
          background: "#fff", 
          padding: "5px 10px", 
          borderRadius: "5px", 
          fontWeight: "bold",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)"
        }}>
          Total Orders: {orderStats.totalOrders}
        </div>
      </div>
    </div>
  </section>
)}
{showUserCharts && selectedSection === "Dashboard" &&(
  <section className={styles.chartsSection}>
    <h3>User Statistics</h3>
    <div className={styles.userChartsContainer}>
      <div 
        className={styles.userChart}  
        onClick={() => {
          setSelectedTable("user");  
          setShowTable(true);
        }}  
        style={{ position: "relative" }}
      >
        <h4>User Breakdown</h4>
        <Pie data={userChartData} /> 
        {/* Total Users Display */}
        <div className={styles.totalUsers} style={{ 
          position: "absolute", 
          bottom: "10px", 
          right: "10px", 
          background: "#fff", 
          padding: "5px 10px", 
          borderRadius: "5px", 
          fontWeight: "bold",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)"
        }}>
          Total Users: {userStats.totalUsers}
        </div>
      </div>
    </div>
  </section>
)}
         {showTable && selectedSection === "Dashboard" &&(
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <FaTimes className={styles.closeIcon} onClick={() => setShowTable(false)} />
              <h3>{selectedTable} Statistics Table</h3>
              <table className={styles.statsTable}>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedTable === "product" && selectedSection === "Dashboard" &&(
                    <>
                      <tr><td>Total Products</td><td>{adminStats.totalProducts}</td></tr>
                      <tr><td>Approved Products</td><td>{adminStats.approvedProducts}</td></tr>
                      <tr><td>Rejected Products</td><td>{adminStats.rejectedProducts}</td></tr>
                    </>
                  )}
                   {selectedTable === "total orders" && selectedSection === "Dashboard" &&(
    <>
      <tr><td>Total Orders</td><td>{orderStats.totalOrders}</td></tr>
      <tr><td>Pending Orders</td><td>{orderStats.pendingOrders}</td></tr>
      <tr><td>Delivered Orders</td><td>{orderStats.deliveredOrders}</td></tr>
      <tr><td>Cancelled Orders</td><td>{orderStats.cancelledOrders}</td></tr>

    </>
  )}
  {selectedTable === "user" && selectedSection === "Dashboard" && (
            <>
              <tr><td>Total Users</td><td>{userStats.totalUsers}</td></tr>
              <tr><td>Total Sellers</td><td>{userStats.totalSellers}</td></tr>
              <tr><td>Total Buyers</td><td>{userStats.totalBuyers}</td></tr>
            </>
          )}
    </tbody>
                                  
              </table>
            </div>
          </div>
        )}
          {selectedSection === "Messages & Notifications" && (
          <section className={styles.contactMessagesSection}>
          <h3>Contact Messages</h3>
          <table className={styles.contactTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contactMessages.map((message, index) => (
                <tr key={index}>
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{message.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
          )}


                  {/* Show the Analytics Section when "Analysis" is clicked */}
                  {selectedSection === "Analysis" && (
            <section className={styles.chartSection}>
              <h3>Revenue Analysis</h3>
              <div className={styles.chartContainer}>
                <WeeklyRevenueChart /> {/* Include WeeklyRevenueChart component */}
                </div>
              </section>
            )}
          </main>

        {/* Pop-up for Admin Stats */}
        {showPopup && selectedSection === "Admins" &&(
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <h2>{popupTitle} Stats</h2>
              <div className={styles.statCards}>
                {popupTitle === "Product Manager" && (
                  <>
                    <div className={styles.statCard}>
                      <h3>{adminStats.totalProducts}</h3>
                      <p>Total Products</p>
                    </div>
                    <div className={styles.statCard}>
                      <h3>{adminStats.totalSellers}</h3>
                      <p>Total Sellers</p>
                    </div>
                    <div className={styles.statCard}>
                      <h3>{adminStats.approvedProducts}</h3>
                      <p>Approved Products</p>
                    </div>
                    <div className={styles.statCard}>
                      <h3>{adminStats.rejectedProducts}</h3>
                      <p>Rejected Products</p>
                    </div>
                  </>
                )}

                {popupTitle === "User Manager" && (
                  <>
                    <div className={styles.statCard}>
                      <h3>{adminStats.totalSellers}</h3>
                      <p>Total Sellers</p>
                    </div>
                    <div className={styles.statCard}>
                      <h3>{adminStats.totalBuyers}</h3>
                      <p>Total Buyers</p>
                    </div>
                  </>
                )}

                {popupTitle === "Order Manager" && (
                  <>
                    <div className={styles.statCard}>
                      <h3>{adminStats.totalOrders}</h3>
                      <p>Total Orders</p>
                    </div>
                    <div className={styles.statCard}>
                      <h3>{adminStats.canceledOrders}</h3>
                      <p>Canceled Orders</p>
                    </div>
                  </>
                )}
              </div>
              <button className={styles.closeBtn} onClick={() => setShowPopup(false)}>Close</button>
            </div>
          </div>
        )}
 {showReviewPanel && selectedSection === "Reviews" && (
  <div className={styles.reviewPanel}>
    <h2>Customer Reviews</h2>
    {reviews.length > 0 ? (
      reviews.map((review, index) => (
        <div key={index} className={styles.reviewCard}>
          <h4>{review.email}</h4>
          <p>{review.review}</p>
        
        </div>
      ))
    ) : (
      <p>No reviews available</p>
    )}
  </div>
)}




      </div>
    );
};

export default SuperAdminDashboard;
