import React, { useState, useEffect } from "react";
import { FiX,FiTrash2, FiPlusCircle } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import styles from "../styles/AddProductForm.module.css";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import sowingAnimation from "../assets/lottie/lt1.json";
import irrigationAnimation from "../assets/lottie/lt5.json";
import harvestingAnimation from "../assets/lottie/lt3.json";
import submitAnimation from "../assets/lottie/lt4.json";

const AddProductForm = () => {
  const [sellerEmail, setSellerEmail] = useState("");
  const [step, setStep] = useState(1); // Step tracking
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize navigate
  

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    overview: "",
    productFeatures: [""], // Features array
    nutritionalInfo: "",
    usageInstructions: "",
    images: [],
    farmToTableProcess: [
      { step: "Farming", details: "" },
      { step: "Harvesting", details: "" },
      { step: "Processing", details: "" },
      { step: "Packaging", details: "" },
      { step: "Delivery", details: "" }
    ]
  });

  const [animateFarmer, setAnimateFarmer] = useState(true);
  useEffect(() => {
    const storedSellerEmail = localStorage.getItem("sellerEmail");
    if (storedSellerEmail) {
      setSellerEmail(storedSellerEmail);
    }
    setTimeout(() => setAnimateFarmer(false), 5000); // Farmer disappears after animation
  }, []);

  useEffect(() => {
    const storedSellerEmail = localStorage.getItem("sellerEmail");
    if (storedSellerEmail) {
      setSellerEmail(storedSellerEmail);
    }
  }, []);

  const animations = {
    1: sowingAnimation,
    2: irrigationAnimation,
    3: harvestingAnimation,
    4: submitAnimation,
  };

  const flipVariants = {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { rotateY: -90, opacity: 0, transition: { duration: 0.5 } },
  };

  const handleChange = (field, value) => {
    setProduct({ ...product, [field]: value });
  
    // Live validation
    if (errors[field]) {
      validateFields();
    }
  };
  

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...product.productFeatures];
    updatedFeatures[index] = value;
    setProduct({ ...product, productFeatures: updatedFeatures });
  };

  const addFeature = () => {
    setProduct({ ...product, productFeatures: [...product.productFeatures, ""] });
  };

  const handleProcessChange = (index, field, value) => {
    const updatedProcess = [...product.farmToTableProcess];
    updatedProcess[index][field] = value;
    setProduct({ ...product, farmToTableProcess: updatedProcess });
  };

  const handleDrop = (acceptedFiles) => {
    setProduct({ ...product, images: [...product.images, ...acceptedFiles] });
  };
  const removeImage = (index) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    setProduct({ ...product, images: updatedImages });
  };
  const validateFields = () => {
    let tempErrors = {};
  
    if (step === 1) {
      if (!product.name.trim()) tempErrors.name = "Product name is required.";
      if (!product.category) tempErrors.category = "Please select a category.";
      if (!product.price || product.price <= 0) tempErrors.price = "Enter a valid price.";
      if (!product.stock || product.stock < 1) tempErrors.stock = "Stock must be at least 1.";
    }
  
    if (step === 2) {
      if (!product.overview.trim()) tempErrors.overview = "Overview is required.";
      if (!product.nutritionalInfo.trim()) tempErrors.nutritionalInfo = "Nutritional info is required.";
      if (!product.usageInstructions.trim()) tempErrors.usageInstructions = "Usage instructions are required.";
    }
  
    if (step === 3) {
      if (product.farmToTableProcess.some(p => !p.details.trim())) {
        tempErrors.process = "All farm-to-table steps must be filled.";
      }
    }
  
    if (step === 4) {
      if (product.productFeatures.some(feature => !feature.trim())) {
        tempErrors.features = "All features must be filled.";
      }
      if (product.images.length === 0) tempErrors.images = "At least one image is required.";
    }
  
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;
  
    if (step !== 4) {
      alert("Please complete all steps before submitting.");
      return;
    }
  
    if (product.images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }
  
    if (!sellerEmail) {
      alert("Seller email not found! Please log in again.");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("sellerEmail", sellerEmail);
      Object.keys(product).forEach((key) => {
        if (key === "images") {
          product.images.forEach((image) => {
            formData.append("images", image);
          });
        } else if (key === "productFeatures" || key === "farmToTableProcess") {
          formData.append(key, JSON.stringify(product[key]));
        } else {
          formData.append(key, product[key]);
        }
      });
  
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`, {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }
  
      alert("Product added successfully!");
            // Redirect to seller's dashboard
            navigate("/dashboard/:sellerId");
      setProduct({
        name: "",
        category: "",
        price: "",
        stock: "",
        overview: "",
        productFeatures: [""],
        nutritionalInfo: "",
        usageInstructions: "",
        images: [],
        farmToTableProcess: [
          { step: "Farming", details: "" },
          { step: "Harvesting", details: "" },
          { step: "Processing", details: "" },
          { step: "Packaging", details: "" },
          { step: "Delivery", details: "" },
        ],
      });
      setStep(1);
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding product. Please try again.");
    }
  };
  
  const handleNextStep = () => {
    console.log("Current Step:", step);
    const isValid = validateFields();
    console.log("Validation Result:", isValid);
    if (isValid) setStep((prevStep) => prevStep + 1);
  };
  
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Left Section - Animated Form */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className={styles.leftSection}
        >
          <h2 className={styles.title}>Add New Product</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={flipVariants} initial="initial" animate="animate" exit="exit">
                <input 
  type="text" 
  placeholder="Product Name" 
  className={`${styles.input} ${errors.name ? styles.errorInput : ""}`} 
  value={product.name} 
  onChange={(e) => handleChange("name", e.target.value)}
  required 
/>
{errors.name && <p className={styles.error}>⚠️ {errors.name}</p>}
           
                <select  className={`${styles.input} ${errors.name ? styles.errorInput : ""}`} value={product.category} onChange={(e) => handleChange("category", e.target.value)} required>
                  <option value="">Select Category</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Spices">Spices</option>
                  <option value="Herbs">Herbs</option>
                  <option value="Equipments">Equipments</option>
                  <option value="Dried-Fruits">Dried-Fruits</option>
                  <option value="Grains">Grains</option>
                  <option value="Fertilizers">Fertilizers</option>
                  <option value="Seeds">Seeds</option>
                </select>
                {errors.category && <p className={styles.error}>{errors.category}</p>}
                <input type="number" placeholder="Price"  className={`${styles.input} ${errors.name ? styles.errorInput : ""}`} value={product.price} onChange={(e) => handleChange("price", e.target.value)} required />
                {errors.price && <p className={styles.error}>{errors.price}</p>}
                <input type="number" placeholder="Stock"  className={`${styles.input} ${errors.name ? styles.errorInput : ""}`} value={product.stock} onChange={(e) => handleChange("stock", e.target.value)} required />
                {errors.stock && <p className={styles.error}>{errors.stock}</p>}
              </motion.div>
            )}
             {step === 2 && (

<motion.div key="step2" variants={flipVariants} initial="initial" animate="animate" exit="exit">

                    <textarea placeholder="Overview" row="100" cols="50"  className={`${styles.input} ${errors.name ? styles.errorInput : ""}`} value={product.overview} onChange={(e) => handleChange("overview", e.target.value)} required />

                    <textarea placeholder="Nutritional Information" row="100" cols="50"  className={`${styles.input} ${errors.name ? styles.errorInput : ""}`} value={product.nutritionalInfo} onChange={(e) => handleChange("nutritionalInfo", e.target.value)} />

                    <textarea placeholder="Usage Instructions" row="100" cols="50"  className={`${styles.input} ${errors.name ? styles.errorInput : ""}`} value={product.usageInstructions} onChange={(e) => handleChange("usageInstructions", e.target.value)} />

                  </motion.div>

                  )}
                    {step === 3 && (

<motion.div key="step3" variants={flipVariants} initial="initial" animate="animate" exit="exit">

                    {product.farmToTableProcess.map((process, index) => (

                      <div key={index}>

                        <label>{process.step}</label>

                        <textarea  className={`${styles.input} ${errors.name ? styles.errorInput : ""}`} value={process.details} onChange={(e) => handleProcessChange(index, "details", e.target.value)} required />

                      </div>

                    ))}

                  </motion.div>

                  )}
                  {step === 4 && (
            <motion.div key="step4" variants={flipVariants} initial="initial" animate="animate" exit="exit">
              {product.productFeatures.map((feature, index) => (
                <input key={index} type="text" placeholder="Feature"  className={`${styles.input} ${errors.name ? styles.errorInput : ""}`} value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} />
              ))}
              <button type="button" className={styles.addBtn} onClick={addFeature}>
                <FiPlusCircle /> Add Feature
              </button>

              <ImageUpload onDrop={handleDrop} />
              {product.images.length > 0 && (
                <div className={styles.imagePreview}>
                  {product.images.map((image, index) => (
                    <div key={index} className={styles.imageItem}>
                      <p>{image.name}</p>
                      <FiX className={styles.removeIcon} onClick={() => removeImage(index)} />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

  
            {/* Buttons */}
            <div className={styles.buttonContainer}>
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} className={styles.prevBtn}>
                  Previous
                </button>
              )}
              {step < 4 ? (
                <button type="button" onClick={handleNextStep} className={styles.nextBtn}>
                  Next
                </button>
              ) : (
                <button type="submit" className={styles.submitBtn}>
                  Submit
                </button>
              )}
            </div>
            </AnimatePresence>
          </form>
        </motion.div>
  
        {/* Right Section - Animated Image */}
         {/* Right Section - Lottie Animation */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={styles.rightSection}
        >
          <Lottie animationData={animations[step]} loop={true} className={styles.lottie} />
        </motion.div>

      </div>
    </div>
  );
  
};

const ImageUpload = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({ accept: { "image/*": [] }, onDrop });

  return (
    <div {...getRootProps()} className={styles.dropzone}>
      <input {...getInputProps()} />
      <p>Drag & Drop or Click to Upload Images</p>
      
    </div>
  );
};

export default AddProductForm;


