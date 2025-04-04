import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import styles from "../styles/FarmingForm.module.css";

const FarmingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    spaceAvailable: "",
    environmentType: "",
    budget: "",
    farmingGoals: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/custom-farming", formData);

      if (response.data.success) {
        toast.success(" Your appointment has been booked successfully. Check your email!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        // Clear form after successful submission
        setFormData({ name: "", email: "", spaceAvailable: "", environmentType: "", budget: "", farmingGoals: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("❌ Error booking appointment. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <div className={styles["form-container"]}>
      <h2>Customized Farming Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Available Space (sq ft):</label>
        <input type="text" name="spaceAvailable" value={formData.spaceAvailable} onChange={handleChange} required />

        <label>Environment Type:</label>
        <input type="text" name="environmentType" value={formData.environmentType} onChange={handleChange} required />

        <label>Budget:</label>
        <input type="text" name="budget" value={formData.budget} onChange={handleChange} required />

        <label>Farming Goals:</label>
        <textarea name="farmingGoals" value={formData.farmingGoals} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>

      {/* Toastify Container */}
      <ToastContainer />
    </div>
  );
};

export default FarmingForm;
