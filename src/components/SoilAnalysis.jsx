import { useState } from "react";

const SoilAnalysis = () => {
    const [file, setFile] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const analyzeSoil = async () => {
        if (!file) return alert("Please upload an image!");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/analyze`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error(`Server error: ${response.status}`);

            const data = await response.json();
            console.log("✅ Analysis Result:", data);
            setAnalysisResult(data);
        } catch (error) {
            console.error("❌ Error in soil analysis:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>🌱 AI-Based Soil & Plant Analysis</h2>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <br />
            <button onClick={analyzeSoil} style={{ marginTop: "10px", padding: "10px", fontSize: "16px", background: "green", color: "white", border: "none" }}>
                Analyze Plant
            </button>
            {analysisResult && (
                <div style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
                    🔍 Disease: {analysisResult.diagnosis} <br />
                    🎯 Accuracy: {analysisResult.accuracy} <br />
                    ✅ Status: {analysisResult.status}
                </div>
            )}
        </div>
    );
};

export default SoilAnalysis;
