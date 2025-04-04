import React, { useState, useEffect } from "react";
import styles from "../styles/WeatherSuggestion.module.css";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { FaTemperatureHigh, FaCloudSun, FaLeaf, FaTimes } from "react-icons/fa";

const states = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal"
];

const stateToCity = {
  "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur", "Tirupati"],
  "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Pasighat"],
  "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Tezpur"],
  "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba"],
  "Goa": ["Panaji", "Vasco da Gama", "Margao", "Mapusa"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Haryana": ["Chandigarh", "Faridabad", "Gurgaon", "Hisar"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangalore", "Hubli"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Manipur": ["Imphal", "Churachandpur", "Thoubal", "Bishnupur"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Puri", "Rourkela"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Bikaner"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailashahar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Almora"],
  "West Bengal": ["Kolkata", "Siliguri", "Asansol", "Durgapur"]
};

const waterAvailabilityOptions = ["High", "Medium", "Low"];
const soilTypes = ["Sandy", "Loamy", "Clayey", "Black Soil"];
const landTypes = ["Flat", "Hilly", "Terraced"];

const API_KEY = "22ffa01896bdc94792b11b5b17c8a288";

const WeatherSuggestion = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [waterAvailability, setWaterAvailability] = useState("");
  const [soilType, setSoilType] = useState("");
  const [landType, setLandType] = useState("");
  const [weather, setWeather] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    }
  }, [selectedCity]);
  
  useEffect(() => {
    if (weather && soilType && waterAvailability && landType) {
      getRecommendations(weather.temp, soilType, waterAvailability, landType);
    }
  }, [weather, soilType, waterAvailability, landType]);

  const fetchWeather = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      if (data.main) {
        const weatherData = {
          temp: data.main.temp,
          condition: data.weather[0].main,
        };
        setWeather(weatherData);
        getRecommendations(weatherData.temp, soilType, waterAvailability, landType);      
      } else {
        setWeather(null);
        setRecommendations([]);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeather(null);
      setRecommendations([]);
    }
  };

  const getRecommendations = (temperature, soilType, waterAvailability, landType) => {
    let crops = [
      { crop: "Rice", tempRange: [25, 45], soil: ["Clayey", "Loamy"], water: "High", land: ["Flat"] },
      { crop: "Wheat", tempRange: [10, 25], soil: ["Loamy", "Sandy"], water: "Medium", land: ["Flat"] },
      { crop: "Millet", tempRange: [20, 35], soil: ["Sandy", "Loamy"], water: "Low", land: ["Flat", "Hilly"] },
      { crop: "Sugarcane", tempRange: [25, 40], soil: ["Loamy", "Black Soil"], water: "High", land: ["Flat"] },
      { crop: "Tomato", tempRange: [20, 30], soil: ["Loamy", "Sandy"], water: "Medium", land: ["Flat"] },
      { crop: "Carrot", tempRange: [15, 25], soil: ["Sandy", "Loamy"], water: "Medium", land: ["Flat", "Hilly"] },
      { crop: "Potato", tempRange: [10, 20], soil: ["Sandy", "Loamy"], water: "Medium", land: ["Flat", "Hilly"] },
      { crop: "Mustard", tempRange: [15, 25], soil: ["Loamy", "Sandy"], water: "Low", land: ["Flat"] },
      { crop: "Tea", tempRange: [15, 25], soil: ["Loamy"], water: "High", land: ["Hilly"] },
      { crop: "Coffee", tempRange: [20, 30], soil: ["Loamy"], water: "High", land: ["Hilly"] },
    ];
  
    let filteredCrops = crops.filter(crop => 
      temperature >= crop.tempRange[0] && temperature <= crop.tempRange[1] &&
      crop.soil.includes(soilType) &&
      crop.water === waterAvailability &&
      crop.land.includes(landType)
    );
  
    setRecommendations(filteredCrops.length > 0 ? filteredCrops : [{ crop: "Fetching The Crop...", resources: "Try adjusting soil, water, or land type" }]);
    // Show the popup when all selections are made and recommendations are available
    if (filteredCrops.length > 0) {
      setShowPopup(true);
    }
  };
  

  return (
    <motion.div className={styles.container} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <h1 className={styles.title}>🌾 Smart Farming Assistant 🌦️</h1>

      {/* State Selection */}
      <motion.select className={styles.dropdown} value={selectedState} onChange={(e) => {
        setSelectedState(e.target.value);
        setSelectedCity(""); // Reset city when state changes
      }} whileHover={{ scale: 1.05 }}>
        <option value="">Select your state</option>
        {states.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </motion.select>

      {/* City Selection */}
      {selectedState && stateToCity[selectedState] && (
        <motion.select className={styles.dropdown} value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} whileHover={{ scale: 1.05 }}>
          <option value="">Select your city</option>
          {stateToCity[selectedState].map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </motion.select>
      )}

      {/* Water Availability Selection */}
      <motion.select className={styles.dropdown} value={waterAvailability} onChange={(e) => setWaterAvailability(e.target.value)} whileHover={{ scale: 1.05 }}>
        <option value="">Select water availability</option>
        {waterAvailabilityOptions.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </motion.select>

      {/* Soil Type Selection */}
      <motion.select className={styles.dropdown} value={soilType} onChange={(e) => setSoilType(e.target.value)} whileHover={{ scale: 1.05 }}>
        <option value="">Select soil type</option>
        {soilTypes.map((soil) => (
          <option key={soil} value={soil}>{soil}</option>
        ))}
      </motion.select>

      {/* Land Type Selection */}
      <motion.select className={styles.dropdown} value={landType} onChange={(e) => setLandType(e.target.value)} whileHover={{ scale: 1.05 }}>
        <option value="">Select land type</option>
        {landTypes.map((land) => (
          <option key={land} value={land}>{land}</option>
        ))}
      </motion.select>

      {/* Weather Details */}
     {/* "Get Crop" Button */}
<motion.button 
  className={styles.getCropButton} 
  onClick={() => setShowPopup(true)}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Get Crop
</motion.button>

{/* Popup for Crop Recommendations */}
{showPopup && (
        <div className={styles.popupOverlay}>
          
          <motion.div className={styles.popup} initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
            <div className={styles.popupHeader}>
              <h2>🌱 Recommended Crops</h2>
              <button className={styles.closePopupBtn} onClick={() => setShowPopup(false)}>
                <FaTimes />
              </button>
            </div>
            <div className={styles.popupContent}>
            {weather && (
        <Card className={styles.weatherCard}>
          <CardContent>
            <h2><FaCloudSun /> {selectedCity}</h2>
            <p><FaTemperatureHigh /> Temperature: {weather.temp}°C</p>
            <p>Condition: {weather.condition}</p>
          </CardContent>
        </Card>
      )}
              {recommendations.map((rec, index) => (
                <Card key={index} className={styles.popupCard}>
                  <CardContent>
                    <h4><FaLeaf /> {rec.crop}</h4>
                    <p>{rec.resources || "Suitable for this condition"}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default WeatherSuggestion;
