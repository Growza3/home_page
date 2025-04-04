import React, { useEffect, useState } from "react";
import styles from "../styles/AdminUserManagement.module.css"; // Import module-based CSS
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell } from "recharts";


const AdminUserManagement = () => {
    const [buyers, setBuyers] = useState([]);
    const [sellers, setSellers] = useState([]);
    const [activeTab, setActiveTab] = useState("buyers"); // Track active section
    const [showGraph, setShowGraph] = useState(false); // Track graph visibility
    const [showBuyerGraph, setShowBuyerGraph] = useState(false);

    const approvedSellers = sellers.filter(seller => seller.isCertified).length;
    const rejectedSellers = sellers.filter(seller => seller.isRejected).length;

    const graphData = [
        { name: "Approved", count: approvedSellers },
        { name: "Rejected", count: rejectedSellers }
    ];
    const totalBuyers = buyers.length;
const totalSellers = sellers.length;



const COLORS = { 
    Buyers: "#20C997",  // Teal Green (or any other combination)
    Sellers: "#FF6B6B"  // Coral Red (or any other combination)
};
const userPieData = [
    { name: "Buyers", value: totalBuyers, color: COLORS.Buyers },
    { name: "Sellers", value: totalSellers, color: COLORS.Sellers }
];
// Blue for Buyers, Orange for Sellers

    useEffect(() => {
        fetch("http://localhost:5000/api/admin/fetch-users")
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setBuyers(data.buyers);
                    setSellers(data.sellers);
                }
            })
            .catch((error) => console.error("Error fetching users:", error));
    }, []);
// Calculate Buyer Activity Data (Based on Orders Placed)
const buyerGraphData = buyers.map(buyer => ({
    name: buyer.email,
    orders: buyer.orderCount || 0 // Assuming `orderCount` exists in buyer data
})).sort((a, b) => b.orders - a.orders); // Sort by most active

    // Approve Seller
    const approveSeller = async (sellerId) => {
        const response = await fetch("http://localhost:5000/api/admin/approve-seller", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sellerId }),
        });
    
        const data = await response.json();
        if (data.success) {
            alert("Seller approved!");
            setSellers(sellers.map(seller => 
                seller._id === sellerId ? { ...seller, isCertified: true, isRejected: false } : seller
            ));
        } else {
            alert("Failed to approve seller.");
        }
    };
    
    // Reject Seller
    const rejectSeller = async (sellerId) => {
        const response = await fetch("http://localhost:5000/api/admin/reject-seller", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sellerId }),
        });
    
        const data = await response.json();
        if (data.success) {
            alert("Seller rejected!");
            setSellers(sellers.map(seller => 
                seller._id === sellerId ? { ...seller, isCertified: false, isRejected: true } : seller
            ));
        } else {
            alert("Failed to reject seller.");
        }
    };
    
    return (
        <div className={styles.adminContainer}>
            {/* Sidebar Navigation */}
            <aside className={styles.sidebar}>
                <h2 className={styles.sidebarHeading}>User Management</h2>
                <ul className={styles.navList}>
                <li 
    className={`${styles.navItem} ${activeTab === "buyers" ? styles.active : ""}`} 
    onClick={() => {
        setActiveTab("buyers");
        setShowGraph(false);
        setShowBuyerGraph(false); // Hide User Distribution Graph
    }}
>
    Buyers
</li>
<li 
    className={`${styles.navItem} ${activeTab === "sellers" ? styles.active : ""}`} 
    onClick={() => {
        setActiveTab("sellers");
        setShowGraph(false);
        setShowBuyerGraph(false); // Hide User Distribution Graph
    }}
>
    Sellers
</li>
<li 
    className={`${styles.navItem} ${showGraph ? styles.active : ""}`} 
    onClick={() => {
        setShowGraph(true);
        setShowBuyerGraph(false); // Hide User Distribution Graph
        setActiveTab(""); 
    }}
>
    Analysis 📊
</li>
<li 
    className={`${styles.navItem} ${showBuyerGraph ? styles.active : ""}`} 
    onClick={() => { 
        setShowBuyerGraph(true); 
        setShowGraph(false); 
        setActiveTab(""); 
    }}
>
    User Distribution 📊
</li>

                </ul>
            </aside>

            {/* Main Content */}
            <main className={styles.content}>
                <h2 className={styles.heading}>Admin User Management</h2>

                {/* Buyers Section */}
                {activeTab === "buyers" && (
                    <div className={styles.userSection}>
                        <h3 className={styles.subHeading}>Buyers</h3>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    
                                    <th>Email</th>
                                    <th>Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {buyers.map((buyer) => (
                                    <tr key={buyer._id}>
                                       
                                        <td>{buyer.email}</td>
                                        <td>{new Date(buyer.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Sellers Section */}
                {activeTab === "sellers" && (
                    <div className={styles.userSection}>
                        <h3 className={styles.subHeading}>Sellers</h3>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Certificate</th>
                                    <th>Certified</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sellers.map((seller) => (
                                    <tr key={seller._id}>
                                        <td>{seller.username}</td>
                                        <td>{seller.email}</td>
                                        <td>{seller.phone}</td>
                                        <td>
                                            <a href={seller.certificate} target="_blank" rel="noopener noreferrer">
                                                View Certificate
                                            </a>
                                        </td>
                                        <td className={seller.isCertified ? styles.certified : styles.notCertified}>
                                            {seller.isCertified ? "✅ Yes" : "❌ No"}
                                        </td>
                                        <td>
                                            {seller.isCertified ? (
                                                <button className={styles.rejectBtn} onClick={() => rejectSeller(seller._id)}>
                                                    Reject
                                                </button>
                                            ) : (
                                                <button className={styles.approveBtn} onClick={() => approveSeller(seller._id)}>
                                                    Approve
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                )}
                 {/* Bar Graph Section */}
                 {showGraph && (
                    <div className={styles.graphSection}>
                    <h3 className={styles.subHeading}>Sellers Analysis</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={graphData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                )}
               {/* Pie Chart for User Distribution */}
{showBuyerGraph && (
    <div className={styles.graphSection}>
        <h3 className={styles.subHeading}>User Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie 
                    data={userPieData} 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100} 
                    dataKey="value" 
                    label
                >
                    {userPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
        
        {/* Custom Legend */}
        <div className={styles.legendContainer}>
            <span style={{ color: COLORS.Buyers, fontWeight: "bold" }}>⬤ Buyers</span> &nbsp;
            <span style={{ color: COLORS.Sellers, fontWeight: "bold" }}>⬤ Sellers</span>
        </div>
    </div>
)}

            </main>
        </div>
    );
};

export default AdminUserManagement;
