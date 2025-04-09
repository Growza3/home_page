import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaShoppingCart, FaUser, FaTimes, FaEdit, FaSave } from "react-icons/fa";
import "../styles/BuyerProfile.css";
import axios from "axios";

const BuyerProfile = () => {
    const navigate = useNavigate();
    const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });    
    const [activeTab, setActiveTab] = useState("profile");
    const [selectedOrder, setSelectedOrder] = useState(null); 
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileProgress, setProfileProgress] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState("Pending"); // ✅ Default selection: Pending orders
    const [address, setAddress] = useState({
        address: "",
        city: "",
        state: "",
        postalCode: "",
        landmark: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedSection, setSelectedSection] = useState("profile");
  const [orders, setOrders] = useState({ Pending: 0, Delivered: 0, Cancelled: 0 });
    const buyerEmail = localStorage.getItem("userEmail"); // Get email from local storage

    useEffect(() => {
        if (!buyerEmail) {
            navigate("/login");
            
            return;
        }

        // Fetch Buyer Details
        const fetchBuyerDetails = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/buyer/${buyerEmail}`);
                const data = await response.json();
                if (response.ok) setBuyer(data);
            } catch (error) {
                console.error("Error fetching buyer details:", error);
            }
        };
        // Fetch Delivery Address
        const fetchAddress = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/delivery/${buyerEmail}`);
                const data = await response.json();

                if (response.ok && data) {
                    setAddress(data);
                } else {
                    console.log("No address found.");
                }
            } catch (error) {
                console.error("Error fetching delivery address:", error);
            }
        };
        // Fetch Orders for the Buyer
        const fetchOrders = async () => {
            try {
                if (!buyerEmail) {
                    console.error("❌ Buyer email is undefined!");
                    return;
                }

                console.log("Fetching orders for:", buyerEmail); // Debug Log

                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/buyer/orders?email=${buyerEmail}`);
                const data = await response.json();

                if (response.ok) {
                    console.log("Orders Data:", data);
                    setOrders(data);
                } else {
                    console.log("No orders found.");
                }
            } catch (error) {
                console.error("❌ Error fetching orders:", error);
            }
        };

        fetchBuyerDetails();
        fetchAddress(); 
        fetchOrders();
    }, [buyerEmail, navigate]);

    // ✅ Calculate Profile Progress
    useEffect(() => {
        let filledFields = 0;
        if (buyer.name) filledFields++;
        if (buyer.email) filledFields++;
        if (buyer.phone) filledFields++;
        if (address.address) filledFields++;
        if (address.city) filledFields++;
        if (address.state) filledFields++;
        if (address.postalCode) filledFields++;

        setProfileProgress((filledFields / 7) * 100); // Convert to percentage
    }, [buyer, address]);
    
    // ✅ Save Updated Profile (Name & Mobile)
// ✅ Save Updated Profile (Name & Mobile)
const handleSaveProfile = async () => {
    try {
        const updatedData = {
            email: buyerEmail,
            name: buyer.name, // Ensure this is the latest value
            phone: buyer.phone,
        };

        console.log("Sending update request with:", updatedData);

        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/buyer/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        const data = await response.json();
        console.log("Server response:", data);

        if (!response.ok) {
            throw new Error(data.error || "Failed to update profile");
        }

        alert("Profile updated successfully!");
        setIsEditingProfile(false);

        // ✅ Update state with latest values from server response
        setBuyer((prev) => ({
            ...prev,
            name: data.buyer.name, // Use updated name
            phone: data.buyer.phone, // Use updated phone
        }));

    } catch (error) {
        console.error("Error updating profile:", error);
        alert("Error updating profile. Please try again.");
    }
};

 // ✅ Save Address
 const handleSaveAddress = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/delivery/save`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: buyerEmail, ...address }),
        });

        if (!response.ok) throw new Error("Failed to save address");

        alert("Address saved successfully!");
        setIsEditing(false);

        setAddress((prev) => ({ ...prev, address: address.address }));
    } catch (error) {
        console.error("Error saving address:", error);
        alert("Error saving address. Please try again.");
    }
};

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };


// Ensure orders is always an array
const validOrders = Array.isArray(orders) ? orders : [];
  // Count the number of orders based on status
  const orderCounts = useMemo(() => {
    return {
      Pending: validOrders.filter((order) => order.status === "Pending").length,
      Delivered: validOrders.filter((order) => order.status === "Delivered").length,
      Cancelled: validOrders.filter((order) => order.status === "Cancelled").length,
    };
  }, [validOrders]);
      // ✅ Filter orders based on the selected status
      const filteredOrders = useMemo(() => {
        return validOrders.filter(order => order.status === selectedStatus);
    }, [validOrders, selectedStatus]);

    //hnadle cancel order
    const handleCancelOrder = async (orderId) => {
        const buyerEmail = localStorage.getItem("userEmail"); // Ensure email is retrieved
    
        const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
        if (!confirmCancel) return;
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/cancel/${orderId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ buyerEmail }) // ✅ Include buyerEmail in request body
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Order cancelled successfully! Refund initiated.");
                setOrders((prevOrders) => [...prevOrders]); // Updating state
            } else {
                alert("Failed to cancel order: " + data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    

    //refund on cancelled orders
    const processRefund = async (paymentId, amount) => {
        try {
            const refund = await stripe.refunds.create({
                charge: paymentId,
                amount: amount * 100, // Convert to smallest currency unit
            });
            return refund;
        } catch (error) {
            console.error("Refund failed:", error);
            return null;
        }
    };    
    

    return (
        <div className="profile-container">
        {/* Sidebar Navigation */}
        <div className="sidebar">
            <div className="sidebar-header">
                <FaUserCircle className="sidebar-avatar" />
                <h2>{buyer?.name || "User"}</h2>
            </div>
            <div className="sidebar-menu">
                <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
                    <FaUser /> Profile
                </button>
                <button className={activeTab === "orders" ? "active" : ""} onClick={() => setActiveTab("orders")}>
                    <FaShoppingCart /> Orders
                </button>
               
                <button className="logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
            {activeTab === "profile" && (
                <div className="profile-info">
                    <h2>Profile Details</h2>

                    <p><strong>Name:</strong> {isEditing ? (
                        <input type="text" value={buyer.name} onChange={(e) => setBuyer({ ...buyer, name: e.target.value })} />
                    ) : buyer.name}</p>

                    <p><strong>Email:</strong> {buyer.email}</p>

                    <p><strong>Phone:</strong> {isEditing ? (
                        <input type="text" value={buyer.phone} onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })} />
                    ) : buyer.phone}</p>

                    {isEditing ? (
                        <button onClick={handleSaveProfile}>
                            <FaSave /> Save Profile
                        </button>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>
                            <FaEdit /> Edit Profile
                        </button>
                    )}

                    <h2>Delivery Address</h2>
{address.address ? (
    <div>
        <p><strong>Address:</strong> {isEditing ? (
            <input type="text" value={address.address} onChange={(e) => setAddress({ ...address, address: e.target.value })} />
        ) : address.address}</p>

        <p><strong>City:</strong> {isEditing ? (
            <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
        ) : address.city}</p>

        <p><strong>State:</strong> {isEditing ? (
            <input type="text" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
        ) : address.state}</p>

        <p><strong>Postal Code:</strong> {isEditing ? (
            <input type="text" value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} />
        ) : address.postalCode}</p>

        <p><strong>Landmark:</strong> {isEditing ? (
            <input type="text" value={address.landmark} onChange={(e) => setAddress({ ...address, landmark: e.target.value })} />
        ) : address.landmark || "N/A"}</p>

        {isEditing ? (
            <button onClick={handleSaveAddress}>
                <FaSave /> Save Address
            </button>
        ) : (
            <button onClick={() => setIsEditing(true)}>
                <FaEdit /> Edit Address
            </button>
        )}
    </div>
) : (
    <div>
        <p>No address found. Please enter your address:</p>
        <input type="text" placeholder="Address" value={address.address} onChange={(e) => setAddress({ ...address, address: e.target.value })} />
        <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
        <input type="text" placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
        <input type="text" placeholder="Postal Code" value={address.postalCode} onChange={(e) => setAddress({ ...address, postalCode: e.target.value })} />
        <input type="text" placeholder="Landmark (Optional)" value={address.landmark} onChange={(e) => setAddress({ ...address, landmark: e.target.value })} />
        <button onClick={handleSaveAddress}>
            <FaSave /> Save Address
        </button>
    </div>
)}

                </div>
                )}
{activeTab === "orderstatus" && (
    <div className="order-status-container">
        {/* Order Status Summary Cards */}
        <div className="status-cards">
            {["Pending", "Delivered", "Cancelled"].map((status) => (
                <div
                    key={status}
                    className={`status-card ${selectedStatus === status ? "active" : ""}`}
                    onClick={() => setSelectedStatus(status)}
                >
                    <h3>{status}</h3>
                    <p>{orderCounts[status.toLowerCase()]}</p>
                </div>
            ))}
        </div>

        {/* Detailed Order List */}
        <div className="order-details">
    <h2>{selectedStatus} Orders</h2>
    {filteredOrders.length > 0 ? (
        <ul>
            {filteredOrders.map((order, index) => (
                <li key={index}>
                    <p><strong>Order ID:</strong> {order._id}</p>

                    {/* Loop through Products Array */}
                    {order.products.map((product, i) => (
                        <div key={i}>
                            <p><strong>Product:</strong> {product.productId?.name || "Unknown Product"}</p>
                            <p><strong>Quantity:</strong> {product.quantity}</p>
                            <p><strong>Price:</strong> ₹{product.productId?.price || "N/A"}</p>
                        </div>
                    ))}
                </li>
            ))}
        </ul>
    ) : (
        <p>No {selectedStatus.toLowerCase()} orders found.</p>
    )}
</div>

    </div>
)}


                {/* Orders Section */}
                {activeTab === "orders" && (
    <div className="orders-section">
        {/* Status Filter Buttons */}
        <div className="status-cards">
            {["Pending", "Delivered", "Cancelled"].map((status) => (
                <div
                    key={status}
                    className={`status-card ${selectedStatus === status ? "active" : ""}`}
                    onClick={() => setSelectedStatus(status)}
                >
                    <h3>{status}</h3>
                    <p>{orderCounts[status.toLowerCase()]}</p>
                </div>
            ))}
        </div>

        {/* Filter Orders Based on Selected Status */}
        {filteredOrders.length === 0 ? (
            <p>No {selectedStatus.toLowerCase()} orders found.</p>
        ) : (
            <div className="orders-list">
                {filteredOrders.map((order) => (
                    <div className="order-card" key={order._id} onClick={() => setSelectedOrder(order)}>
                        <div className="order-info">
                            <p><strong>Placed Order On:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                            <p><strong>Total Amount:</strong> ₹{order.billingInfo.totalAmount}</p>
                            <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
)}

            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button className="close-btn" onClick={() => setSelectedOrder(null)}>
                            <FaTimes />
                        </button>
                        <h2>Order Details</h2>
                        <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                        <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                        
                        {/* Product Carousel */}
                        <div className="carousel">
    {selectedOrder && selectedOrder.products?.length > 0 ? (
        selectedOrder.products.map((product) => (
            <div key={product.productId?._id} className="carousel-item">
                <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product.productId?.images?.[0]}`} alt={product.productId?.name} />
                <p><strong>{product.productId?.name}</strong></p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: ₹{product.productId?.price}</p>
            </div>
        ))
    ) : (
        <p>Loading products...</p>
    )}

    {/* Show "Cancel Order" button only if order is Pending */}
    {selectedOrder?.status === "Pending" && (
        <button className="cancel-btn" onClick={() => handleCancelOrder(selectedOrder._id)}>Cancel Order</button>
    )}
</div>


                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyerProfile;
