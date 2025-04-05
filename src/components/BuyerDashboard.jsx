import React from "react";
import { FaShoppingCart, FaBoxOpen, FaList, FaTruck, FaStar } from "react-icons/fa";
import "../styles/buyerDashboard.css";

const BuyerDashboard = () => {
  const orders = [
    { id: "#12345", product: "Organic Apples", status: "Shipped", icon: <FaTruck /> },
    { id: "#67890", product: "Fresh Carrots", status: "Pending", icon: <FaStar /> },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Buyer Dashboard</h2>
      <div className="stats-container">
        <div className="stat-card">
          <FaShoppingCart className="icon" />
          <h3>15</h3>
          <p>Total Orders</p>
        </div>
        <div className="stat-card">
          <FaBoxOpen className="icon" />
          <h3>3</h3>
          <p>Pending Deliveries</p>
        </div>
        <div className="stat-card">
          <FaList className="icon" />
          <h3>5</h3>
          <p>Wishlist Items</p>
        </div>
      </div>
      
      <h3 className="recent-orders-title">Recent Orders</h3>
      <div className="orders-container">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.product}</td>
                <td className="status">
                  {order.icon} {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyerDashboard;
