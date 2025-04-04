import React, { useState } from "react";
import UploadForm from "./UploadForm";
import Results from "./Results";
import "../styles/Final.module.css";

const Final = () => {
    const [results, setResults] = useState(null);

    return (
        <div className="app-container">
            <h1>🌿 Plant Disease Detector</h1>
            <UploadForm setResults={setResults} />
            <Results results={results} />
        </div>
    );
};

export default Final;
