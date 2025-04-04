import { useEffect, useState } from "react";

const CropRecommendations = () => {
    const [crops, setCrops] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const cropCalendarAPI = "https://data.apps.fao.org/catalog/terriajs/item/YOUR_CROP_CALENDAR_ID.json";
            
            const response = await fetch(cropCalendarAPI);
            const data = await response.json();

            const filteredCrops = data.filter(crop => crop.region === determineRegion(lat, lon));
            setCrops(filteredCrops);
        });
    }, []);

    return (
        <div>
            <h2>Recommended Crops</h2>
            <ul>
                {crops.map((crop, index) => (
                    <li key={index}>{crop.name} - Best Time: {crop.season}</li>
                ))}
            </ul>
        </div>
    );
};

export default CropRecommendations;
