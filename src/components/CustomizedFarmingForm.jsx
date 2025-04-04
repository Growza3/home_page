//form
import React, { useState } from "react";
import styles from "../styles/CustomizedFarmingForm.module.css";

const CustomFarmingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    climate: "",
    landType: "",
    landSize: "",
    soilType: "",
    waterAvailability: "",
    farmingGoal: [],
    crops: [],
    farmingMethod: "",
    smartFarming: "",
    irrigationSetup: "",
    soilMonitoring: "",
    marketAccess: "",
    consultation: "",
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked
          ? [...formData[name], value]
          : formData[name].filter((item) => item !== value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.progressBar}>Step {step} of 5</div>
      <form onSubmit={handleSubmit} className={styles.formBox}>
        {step === 1 && (
          <div className={styles.stepBox}>
            <h2>Personal Details</h2>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            <button type="button" onClick={nextStep} className={styles.nextBtn}>Next</button>
          </div>
        )}

        {step === 2 && (
          <div className={styles.stepBox}>
            <h2>Land & Climate Details</h2>
            <select name="location" value={formData.location} onChange={handleChange} required>
              <option value="">Select Location</option>
              <option value="Tropical">Tropical</option>
              <option value="Temperate">Temperate</option>
              <option value="Dry">Dry</option>
              <option value="Humid">Humid</option>
              <option value="Cold">Cold</option>
            </select>
            <select name="landType" value={formData.landType} onChange={handleChange} required>
              <option value="">Select Land Type</option>
              <option value="Backyard">Backyard</option>
              <option value="Balcony">Balcony</option>
              <option value="Open Land">Open Land</option>
              <option value="Commercial Farm">Commercial Farm</option>
              <option value="Hydroponic Setup">Hydroponic Setup</option>
            </select>
            <button type="button" onClick={prevStep} className={styles.prevBtn}>Back</button>
            <button type="button" onClick={nextStep} className={styles.nextBtn}>Next</button>
          </div>
        )}

        {step === 3 && (
          <div className={styles.stepBox}>
            <h2>Farming Goals & Preferences</h2>
            <select name="farmingMethod" value={formData.farmingMethod} onChange={handleChange} required>
              <option value="">Select Farming Method</option>
              <option value="Traditional Organic">Traditional Organic</option>
              <option value="Smart Farming">Smart Farming</option>
              <option value="Hydroponics">Hydroponics</option>
              <option value="Greenhouse Farming">Greenhouse Farming</option>
            </select>
            <button type="button" onClick={prevStep} className={styles.prevBtn}>Back</button>
            <button type="button" onClick={nextStep} className={styles.nextBtn}>Next</button>
          </div>
        )}

        {step === 4 && (
          <div className={styles.stepBox}>
            <h2>Technology & Support Needs</h2>
            <label>
              <input type="checkbox" name="smartFarming" value="Yes" onChange={handleChange} /> Interested in Smart Farming?
            </label>
            <label>
              <input type="checkbox" name="irrigationSetup" value="Yes" onChange={handleChange} /> Need Automated Irrigation?
            </label>
            <button type="button" onClick={prevStep} className={styles.prevBtn}>Back</button>
            <button type="button" onClick={nextStep} className={styles.nextBtn}>Next</button>
          </div>
        )}

        {step === 5 && (
          <div className={styles.stepBox}>
            <h2>Final Submission</h2>
            <textarea name="additionalInfo" placeholder="Any specific requirements?" value={formData.additionalInfo} onChange={handleChange}></textarea>
            <button type="button" onClick={prevStep} className={styles.prevBtn}>Back</button>
            <button type="submit" className={styles.submitBtn}>Submit</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CustomFarmingForm;