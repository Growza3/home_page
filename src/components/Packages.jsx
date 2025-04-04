//packages
import React from "react";
import styles from "../styles/Packages.module.css";

const packagesData = [
  {
    id: 1,
    title: "Basic Home Farming Package",
    description: "Perfect for beginners and small-scale home gardening.",
    features: [
      "Organic crop selection",
      "Soil quality testing",
      "Water-efficient irrigation",
      "Personalized planting calendar",
    ],
    price: "₹3,000 - ₹5,000",
  },
  {
    id: 2,
    title: "Advanced Organic Farming Package",
    description: "For serious organic farmers with medium to large plots.",
    features: [
      "Complete soil analysis",
      "Seasonal crop rotation",
      "Organic pest control",
      "Automated irrigation setup",
    ],
    price: "₹8,000 - ₹15,000",
  },
  {
    id: 3,
    title: "Smart Farming Package",
    description: "Technology-powered smart farming for maximum efficiency.",
    features: [
      "IoT-based sensors",
      "AI-powered yield predictions",
      "Automated irrigation",
      "Real-time farm monitoring",
    ],
    price: "₹20,000 - ₹50,000",
  },
  {
    id: 4,
    title: "Hydroponic Farming Package",
    description: "Soilless farming for high-yield organic production.",
    features: [
      "Hydroponic system setup",
      "Essential nutrients & pH kit",
      "Climate control guide",
      "Training & market access",
    ],
    price: "₹30,000 - ₹70,000",
  },
  {
    id: 5,
    title: "Commercial Farming Package",
    description: "For large-scale organic production & business farming.",
    features: [
      "Land preparation & soil enrichment",
      "Organic certification guidance",
      "Bulk organic compost",
      "High-yield crop selection",
    ],
    price: "₹50,000+",
  },
  {
    id: 6,
    title: "Custom Consultation Package",
    description: "1-on-1 expert consultation for tailored farming solutions.",
    features: [
      "Personalized expert advice",
      "Crop & soil recommendations",
      "Farming techniques guidance",
      "Government subsidy assistance",
    ],
    price: "₹1,500 - ₹5,000 (per session)",
  },
];

const Packages = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Choose Your Farming Package</h2>
      <div className={styles.packagesGrid}>
        {packagesData.map((pkg) => (
          <div key={pkg.id} className={styles.card}>
            <h3 className={styles.title}>{pkg.title}</h3>
            <p className={styles.description}>{pkg.description}</p>
            <ul className={styles.features}>
              {pkg.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <p className={styles.price}>{pkg.price}</p>
            <button className={styles.button}>Select Package</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;