import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { motion } from "framer-motion";

const PlantDoctor = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const analyzeImage = async () => {
    if (!image) {
      setError("Please upload an image first!");
      return;
    }

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/analyze-plant`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Error analyzing the image. Try again!");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-green-50 min-h-screen">
      <motion.h1
        className="text-3xl font-bold text-green-600 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🌱 AI-Powered Plant Doctor
      </motion.h1>
      
      <label className="cursor-pointer flex flex-col items-center border-dashed border-2 border-green-500 p-6 rounded-lg bg-white shadow-md">
        <FiUpload size={40} className="text-green-500 mb-2" />
        <span className="text-gray-600">Upload a plant/soil image</span>
        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
      </label>

      {preview && (
        <motion.img
          src={preview}
          alt="Uploaded preview"
          className="mt-4 rounded-lg shadow-lg w-60 h-60 object-cover"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        />
      )}

      <button
        className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        onClick={analyzeImage}
      >
        Analyze Image
      </button>

      {loading && <p className="mt-4 text-gray-600">🔍 Analyzing image...</p>}
      {error && <p className="mt-4 text-red-500">⚠️ {error}</p>}
      
      {result && (
        <motion.div className="mt-6 p-4 bg-white shadow-lg rounded-lg w-full max-w-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-lg font-semibold text-green-700">🔎 Analysis Result</h2>
          <p className="text-gray-700">🌾 Recommended Crop: {result.recommendedCrop}</p>
          <p className="text-gray-700">🛑 Detected Issues: {result.issue || "None"}</p>
          <p className="text-gray-700">💡 Solution: {result.solution || "Your plant is healthy!"}</p>
        </motion.div>
      )}
    </div>
  );
};

export default PlantDoctor;
