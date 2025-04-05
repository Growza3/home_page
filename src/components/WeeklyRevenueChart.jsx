import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/WeeklyRevenueChart.css"; // Import the CSS file

ChartJS.register(ArcElement, Tooltip, Legend);

const getWeekFromObjectId = (objectId) => {
  const objectIdString = objectId.toString();
  const timestamp = parseInt(objectIdString.substring(0, 8), 16) * 1000;
  const date = new Date(timestamp);
  return `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
};

const WeeklyRevenueChart = () => {
  const [weeklyRevenue, setWeeklyRevenue] = useState({});
  const [allOrders, setAllOrders] = useState([]); // Store all orders

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/weekly-revenue`);
        const orders = response.data;

        const revenueMap = {};
        
        orders.forEach((order) => {
          const week = getWeekFromObjectId(order._id);
          revenueMap[week] = (revenueMap[week] || 0) + order.totalAmount;
        });

        setWeeklyRevenue(revenueMap);
        setAllOrders(orders); // Store all orders separately
      } catch (error) {
        console.error("Error fetching weekly revenue:", error);
      }
    };

    fetchRevenue();
  }, []);

  const chartData = {
    labels: Object.keys(weeklyRevenue),
    datasets: [
      {
        label: "Weekly Revenue",
        data: Object.values(weeklyRevenue),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#34927a", "#FFA07A"],
      },
    ],
  };

  return (
    <div className="chartSection">
      <div className="chartContainer">
        <h3 className="chartTitle">Weekly Revenue Analysis</h3>
        <Pie data={chartData} />
      </div>

      {/* Revenue Table */}
      <div className="revenueTableContainer">
        <h3 className="chartTitle">All Orders Data</h3>
        <table className="revenueTable">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Week</th>
              <th>Date</th>
              <th>Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{getWeekFromObjectId(order._id)}</td>
                <td>{new Date(parseInt(order._id.substring(0, 8), 16) * 1000).toLocaleDateString()}</td>
                <td>${order.totalAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyRevenueChart;
