import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { Button, Card, CardContent, CircularProgress } from "@mui/material";

const FoodAnalyzer = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const img = new Image();
      img.src = image;
      img.crossOrigin = "anonymous";
      
      img.onload = async () => {
        const model = await mobilenet.load();
        const predictions = await model.classify(img);
        const detectedFood = predictions[0]?.className.split(",")[0];
        
        if (!detectedFood) {
          setAnalysis("Food could not be accurately identified.");
          setLoading(false);
          return;
        }

        const nutritionResponse = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${detectedFood}&apiKey=8120a1495bbb4d05a3373ea228c0bf72`);
        const nutritionData = await nutritionResponse.json();
        
        if (!nutritionData.results.length) {
          setAnalysis("No nutritional data found for this food.");
        } else {
          setAnalysis(nutritionData.results[0]);
        }
      };
    } catch (error) {
      console.error("Error analyzing image:", error);
      setAnalysis("An error occurred during analysis.");
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "16px" }}>
      {!image ? (
        <Webcam ref={webcamRef} screenshotFormat="image/png" style={{ borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }} />
      ) : (
        <img src={image} alt="Captured food" style={{ borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", width: "256px" }} />
      )}
      <div style={{ display: "flex", gap: "8px" }}>
        {!image ? (
          <Button variant="contained" onClick={capture}>Capture Image</Button>
        ) : (
          <Button variant="outlined" onClick={() => setImage(null)}>Capture Another Image</Button>
        )}
        {image && <Button variant="contained" onClick={analyzeImage} disabled={loading}>{loading ? <CircularProgress size={24} /> : "Analyze Image"}</Button>}
      </div>
      {analysis && (
        <Card style={{ width: "320px", padding: "16px" }}>
          <CardContent>
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Analysis Results</h3>
            {typeof analysis === "string" ? (
              <p>{analysis}</p>
            ) : (
              <div>
                <p><strong>Ingredient Name:</strong> {analysis.name}</p>
                <p><strong>Calories:</strong> {analysis.calories || "Not Available"}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FoodAnalyzer;
