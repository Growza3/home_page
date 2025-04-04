import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/ProductManager.module.css";
import { Table, Button, Card, Input, Select } from "antd";

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";



const { Option } = Select;

const ProductManager = () => {
  const [view, setView] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImages, setSelectedImages] = useState({}); // 🔹 Fix: Track selected images globally
  const [analysisData, setAnalysisData] = useState([]); // Data for line chart


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        console.log("Fetched products:", response.data);
        if (response.data && response.data.products) {
          setProducts(response.data.products);
        } else {
          console.error("Unexpected API response structure:", response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sellers");
        console.log("Fetched sellers:", response.data); // Debugging log
        if (response.data.success) {
          setSellers(response.data.sellers);
        } else {
          console.error("Unexpected API response structure:", response.data);
          setSellers([]);
        }
      } catch (error) {
        console.error("Error fetching sellers:", error);
        setSellers([]);
      }
    };
  
    fetchSellers();
  }, []);
  


  const handleStatusChange = async (productId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/update-status/${productId}`, {
        status: newStatus,
      });

      if (response.data.success) {
        setProducts((prev) =>
          prev.map((product) =>
            product._id === productId ? { ...product, status: newStatus } : product
          )
        );
      } else {
        console.error("Failed to update status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // 🔹 Fix: Define the table columns outside of render functions
  const productColumns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images, record) => {
        if (!Array.isArray(images) || images.length === 0) {
          return <img src="/default-image.jpg" alt="Product" className={styles.productImage} />;
        }

        const selectedImage = selectedImages[record._id] || images[0];

        return (
          <div>
            <img src={selectedImage} alt="Product" className={styles.productImage} />
            <Select
              value={selectedImage}
              onChange={(newImage) => setSelectedImages((prev) => ({ ...prev, [record._id]: newImage }))}
              style={{ width: 120, marginLeft: 10 }}
            >
              {images.map((img, index) => (
                <Option key={index} value={img}>{`Image ${index + 1}`}</Option>
              ))}
            </Select>
          </div>
        );
      },
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Price", dataIndex: "price", key: "price", render: (text) => `$${text}` },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Actions",
      render: (_, record) => (
        <Select
          value={record.status}
          onChange={(newStatus) => handleStatusChange(record._id, newStatus)}
          style={{ width: 120 }}
        >
          <Option value="pending">Pending</Option>
          <Option value="approved">Approved</Option>
          <Option value="rejected">Rejected</Option>
        </Select>
      ),
    },
  ];
  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/analysis");
        console.log("Fetched analysis data:", response.data);

        // Ensure data is properly formatted for Recharts
        if (response.data && Array.isArray(response.data)) {
          setAnalysisData(response.data);
        } else {
          console.error("Unexpected analysis API response:", response.data);
          setAnalysisData([]);
        }
      } catch (error) {
        console.error("Error fetching analysis data:", error);
        setAnalysisData([]);
      }
    };

    fetchAnalysisData();
  }, []);

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        
        <ul>
          <li onClick={() => setView("dashboard")}>Dashboard</li>
          <li onClick={() => setView("products")}>Product List</li>
          <li onClick={() => setView("sellers")}>Manage Sellers</li>
          <li onClick={() => setView("analysis")}>Analysis</li> {/* New Analysis Option */}

        </ul>
      </aside>

      <main className={styles.mainContent}>
        {view === "dashboard" && (
          <>
            <h2>Dashboard Overview</h2>
            <div className={styles.dashboardCards}>
              <Card title="Total Products">{products.length}</Card>
              <Card title="Pending Approvals">{products.filter((p) => p.status === "pending").length}</Card>
              <Card title="Approved Products">{products.filter((p) => p.status === "approved").length}</Card>
              <Card title="Rejected Products">{products.filter((p) => p.status === "rejected").length}</Card>
            </div>
          </>
        )}

        {view === "products" && (
          <>
            <h2>Product Manager</h2>
            <Table
  className={styles.table}
  dataSource={products}
  columns={productColumns}
  rowKey="_id"
  loading={loading}
  pagination={{ pageSize: 3}} // Adjust the page size as needed
/>          </>
        )}

        {view === "sellers" && (
          <>
            <h2>Manage Sellers</h2>
            <Input placeholder="Search Sellers..." onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
            <Table
              className={styles.table}
              dataSource={sellers.filter((seller) => 
                seller?.username?.toLowerCase()?.includes(searchTerm)
              )}
              
              columns={[
                { title: "Username", dataIndex: "username", key: "username" },
                { title: "Email", dataIndex: "email", key: "email" },
                { title: "Phone Number", dataIndex: "phone", key: "phone" },
                { title: "Total Products", dataIndex: "totalProducts", key: "totalProducts" },
              ]}
              rowKey="_id"
            />
          </>
        )}
         {view === "analysis" && (
          <>
            <h2>Product Analysis</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analysisData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductManager;
