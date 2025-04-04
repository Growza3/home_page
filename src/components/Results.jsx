import React from "react";
import "./styles.css";

const Results = ({ results }) => {
    if (!results) return null;

    return (
        <div className="results-container">
            <h2>Analysis Results</h2>
            <p><strong>Diagnosis:</strong> {results.diagnosis}</p>
            <p><strong>Confidence Score:</strong> {results.score.toFixed(2)}</p>
            <p><strong>Accuracy:</strong> {results.accuracy}</p>
        </div>
    );
};

export default Results;
