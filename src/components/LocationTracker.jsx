import { useState } from "react";

const LocationTracker = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_KEY = "22ffa01896bdc94792b11b5b17c8a288"; // 🔹 Replace with your API key

    const fetchWeather = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=Surat&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();

            if (!data.main) {
                throw new Error("Invalid response from OpenWeather API");
            }

            const weatherInfo = {
                temperature: data.main.temp,
                humidity: data.main.humidity,
                condition: data.weather[0].main,
                city: data.name,
            };

            console.log("🌦 Weather Data:", weatherInfo);
            setWeather(weatherInfo);
            fetchCrops(weatherInfo); // 🔹 Pass weather data to fetchCrops
        } catch (err) {
            console.error("❌ Failed to fetch weather:", err);
            setError("Failed to fetch weather data.");
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchCrops = async (weatherInfo) => {
        console.log(`🔍 fetchCrops() called with`, weatherInfo);

        if (!weatherInfo) {
            console.error("❌ No weather data provided!");
            setError("Failed to fetch weather data.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/crop-recommendations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(weatherInfo),
            });

            const data = await response.json();

            console.log("🌾 API Response:", data);
            setCrops(data.crops || []);
        } catch (err) {
            console.error("❌ Failed to fetch crop data:", err);
            setError("Failed to fetch crop data");
            setCrops([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
                onClick={fetchWeather}
            >
                Fetch Weather & Show Crops
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {weather && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Weather in {weather.city}:</h2>
                    <p>🌡 Temperature: {weather.temperature}°C</p>
                    <p>💧 Humidity: {weather.humidity}%</p>
                    <p>☁ Condition: {weather.condition}</p>
                </div>
            )}

            {loading && <p className="mt-4 text-gray-500">Fetching crop data...</p>}

            {!loading && crops.length > 0 && (
                <div className="mt-6 w-full">
                    <h2 className="text-lg font-semibold text-center">Recommended Crops</h2>
                    <ul className="mt-2 space-y-2">
                        {crops.map((crop, index) => (
                            <li key={index} className="p-3 bg-gray-100 rounded-lg shadow">
                                🌿 {crop.name} - {crop.suitableSeason}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LocationTracker;
