import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/OrderManager.module.css";
import '@ant-design/compatible';
import { Table, Button, Card, Modal, Statistic } from "antd";
import { DashboardOutlined, ShoppingCartOutlined, UserOutlined, LineChartOutlined } from "@ant-design/icons";
import { Select, message } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Option } = Select;


const OrderManager = () => {
  const [view, setView] = useState("dashboard");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [selectedBuyerOrders, setSelectedBuyerOrders] = useState([]);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [buyerModalVisible, setBuyerModalVisible] = useState(false);
  const [cancelledOrders, setCancelledOrders] = useState([]);

  const [chartData, setChartData] = useState([]);


  useEffect(() => {
    if (view === "orders" || view === "buyers") {
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/orders`)
        .then((response) => {
          setOrders(response.data);
          console.log("Orders data:", response.data); // Add this line to check the data


          if (view === "buyers") {
            const buyerData = response.data.reduce((acc, order) => {
              const buyerEmail = order.email;
              const totalProducts = order.products.length;

              if (acc[buyerEmail]) {
                acc[buyerEmail] += totalProducts;
              } else {
                acc[buyerEmail] = totalProducts;
              }
              return acc;
            }, {});

            setBuyers(Object.entries(buyerData).map(([email, totalProducts]) => ({
              email,
              totalProducts,
            })));
          }
        })
        .catch((error) => console.error("Error fetching orders:", error));
    }
  }, [view]);

  const updateOrderStatus = (orderId, newStatus) => {
    axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/admin/orders/${orderId}`, { status: newStatus })
      .then((response) => {
        message.success("Order status updated successfully");
        setView("orders"); // Refresh the orders list by re-triggering useEffect
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
        message.error("Failed to update order status");
      });
  };

  const fetchBuyerOrders = (buyerEmail) => {
    const buyerOrders = orders.filter(order => order.email === buyerEmail);
    console.log("Fetched Orders:", buyerOrders); // Debugging
  
    const groupedOrders = buyerOrders.map(order => ({
      products: order.products.map(product => ({
        ...product,
        productName: product.productId?.name,
        productImage: product.productId?.images?.[0] 
          ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${product.productId.images[0]}` 
          : "https://via.placeholder.com/150",
        quantity: product.quantity,
        price: product.productId?.price,
      })),
      billingInfo: order.billingInfo || null,  // Ensure billing info exists
      paymentMethod: order.paymentMethod
    }));
  
    console.log("Processed Orders:", groupedOrders); // Debugging
  
    setSelectedBuyerOrders(groupedOrders);
    setCurrentOrderIndex(0);
    setBuyerModalVisible(true);
  };
  
  
  console.log("Current Order Data:", selectedBuyerOrders[currentOrderIndex]);

  const showProductDetails = (order) => {
    setSelectedProduct(order);
    setIsModalVisible(true);
  };
  useEffect(() => {
    if (view === "orders" || view === "analysis") {
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/orders`)
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => console.error("Error fetching orders:", error));
    }
  }, [view]);

  useEffect(() => {
    if (view === "analysis") {
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cancel`)
        .then((response) => {
          setCancelledOrders(response.data);
        })
        .catch((error) => console.error("Error fetching cancelled orders:", error));
    }
  }, [view]);

  useEffect(() => {
    if (orders.length > 0 || cancelledOrders.length > 0) {
      setChartData([
        { name: "Total Orders", count: orders.length },
        { name: "Delivered Orders", count: orders.length },
        { name: "Pending Orders", count: orders.length },
        { name: "Cancelled Orders", count: cancelledOrders.length },
      ]);
    }
  }, [orders, cancelledOrders]);


  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h3 className={styles.logo}>Order Manager</h3>
        <ul>
          <li className={view === "dashboard" ? styles.active : ""} onClick={() => setView("dashboard")}>
            <DashboardOutlined /> Dashboard
          </li>
          <li className={view === "orders" ? styles.active : ""} onClick={() => setView("orders")}>
            <ShoppingCartOutlined /> Orders
          </li>
          <li className={view === "buyers" ? styles.active : ""} onClick={() => setView("buyers")}>
            <UserOutlined /> Buyers
          </li>
          <li className={view === "analysis" ? styles.active : ""} onClick={() => setView("analysis")}>
            <LineChartOutlined /> Analysis
          </li>
        </ul>
      </aside>

      <main className={styles.mainContent}>
        {view === "dashboard" && (
          <>
            <h2>Dashboard Overview</h2>
            <div className={styles.dashboardCards}>
  {orders.length > 0 && [
    { title: "Total Orders", value: orders.length },
    { title: "Pending Orders", value: orders.filter(o => o.status === "Pending").length },
    { title: "Cancelled Orders", value: orders.filter(o => o.status === "Cancelled").length },
    { title: "Delivered Orders", value: orders.filter(o => o.status === "Delivered").length },
  ].map(({ title, value }) => (
    <Card key={title} className={styles.dashboardCard}>
      <Statistic title={title} value={value} />
    </Card>
  ))}
</div>

          </>
        )}

        
{view === "orders" && (
          <>
            <h2>Manage Orders</h2>
            <Table
              dataSource={orders}
              columns={[
                {
                  title: "Products",
                  dataIndex: "products",
                  key: "products",
                  render: (products) =>
                    products.map((product, index) => (
                      <Button key={index} type="link" onClick={() => showProductDetails(product)}>
                        {product.productId?.name}
                      </Button>
                    )),
                },
                { title: "Buyer Email", dataIndex: "email", key: "buyerEmail" },
                { title: "Payment Method", dataIndex: "paymentMethod", key: "paymentMethod" },
                {
                  title: "Total Amount",
                  dataIndex: "totalAmount",
                  key: "totalAmount",
                  render: (text) => `$${text}`,
                },
                {
                  title: "Status",
                  dataIndex: "status",
                  key: "status",
                  render: (status, record) => (
                    <Select
                      value={status} // Use value instead of defaultValue
                      style={{ width: 120 }}
                      onChange={(value) => updateOrderStatus(record._id, value)}
                    >
                      <Option value="Pending">Pending</Option>
                      <Option value="Cancelled">Cancelled</Option>
                      <Option value="Delivered">Delivered</Option>
                    </Select>
                  ),
                },
              ]}
              rowKey="_id"
              pagination={{ pageSize: 5, showQuickJumper: true }}
            />
          </>
        )}

        {view === "buyers" && (
          <>
            <h2>Buyer Details</h2>
            <Table
              dataSource={buyers}
              columns={[
                {
                  title: "Buyer Email",
                  dataIndex: "email",
                  key: "email",
                  render: (email) => (
                    <Button type="link" onClick={() => fetchBuyerOrders(email)}>
                      {email}
                    </Button>
                  ),
                },
                { title: "Total Products Ordered", dataIndex: "totalProducts", key: "totalProducts" },
              ]}
              rowKey="email"
              pagination={{ pageSize: 5, showQuickJumper: true }}
            />
          </>
        )}
           {view === "analysis" && (
          <>
            <h2>Order Analysis</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </>
        )}
      </main>

      {/* Product Details Modal */}
      <Modal title="Product Details" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        {selectedProduct && (
          <div style={{ textAlign: "center" }}>
            <img
              src={selectedProduct.productId?.images?.[0] ? `http://localhost:5000/uploads/${selectedProduct.productId.images[0]}` : "https://via.placeholder.com/150"}
              alt={selectedProduct.productId?.name || "Product Image"}
              style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "10px", marginBottom: "10px" }}
            />
            <h3>{selectedProduct.productId?.name}</h3>
            <p><strong>Price:</strong> ₹{selectedProduct.productId?.price}</p>
            <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
          </div>
        )}
      </Modal>

      {/* Buyer Orders Modal */}
      <Modal title="Buyer Orders" open={buyerModalVisible} onCancel={() => setBuyerModalVisible(false)} footer={null}>
  {selectedBuyerOrders.length > 0 && (
    <div style={{ textAlign: "center" }}>
      <h3>Products in Order</h3>
      
      {selectedBuyerOrders[currentOrderIndex]?.products.map((product, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <img
            src={product.productImage}
            alt="Product"
            style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "10px" }}
          />
          <p><strong>{product.productName}</strong></p>
          <p><strong>Price:</strong>₹{product.price}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
        </div>
      ))}

      {/* Billing Info at Order Level */}
      {selectedBuyerOrders[currentOrderIndex]?.billingInfo?.length > 0 ? (
  <>
    <hr />
    <h4>Billing Information</h4>
    <p><strong>Subtotal:</strong> ₹{selectedBuyerOrders[currentOrderIndex]?.billingInfo[0]?.subtotal || "N/A"}</p>
    <p><strong>GST (18%):</strong> ₹{selectedBuyerOrders[currentOrderIndex]?.billingInfo[0]?.gst || "N/A"}</p>
    <p><strong>Delivery Charge:</strong> ₹{selectedBuyerOrders[currentOrderIndex]?.billingInfo[0]?.deliveryCharge || "N/A"}</p>
    <p><strong>Total Amount:</strong> <b>₹{selectedBuyerOrders[currentOrderIndex]?.billingInfo[0]?.totalAmount || "N/A"}</b></p>
  </>
) : (
  <p><strong>Billing Info:</strong> Not Available</p>
)}



      <Button 
        disabled={currentOrderIndex === 0} 
        onClick={() => setCurrentOrderIndex(currentOrderIndex - 1)}
      >
        Previous Order
      </Button>
      <Button 
        disabled={currentOrderIndex === selectedBuyerOrders.length - 1} 
        onClick={() => setCurrentOrderIndex(currentOrderIndex + 1)}
      >
        Next Order
      </Button>
    </div>
  )}
</Modal>

    </div>
  );
};

export default OrderManager;
