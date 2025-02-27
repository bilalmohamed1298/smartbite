import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

const FoodAnalyzer = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadBackend = async () => {
      await tf.setBackend("webgl");
      await tf.ready();
      console.log("TensorFlow.js backend set to WebGL");
    };
    loadBackend();
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("Captured image:", imageSrc);
    setImage(imageSrc);
    setAnalysis(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Uploaded image:", reader.result);
        setImage(reader.result);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    setLoading(true);
    setAnalysis(null);
    console.log("Starting analysis...");
    try {
      const img = new Image();
      img.src = image;
      img.crossOrigin = "anonymous";

      img.onload = async () => {
        console.log("Image loaded, loading MobileNet model...");
        const model = await mobilenet.load();
        console.log("Model loaded, classifying image...");
        const predictions = await model.classify(img);
        console.log("Predictions:", predictions);

        if (!predictions.length) {
          setAnalysis("Food could not be accurately identified.");
          setLoading(false);
          return;
        }

        const detectedFood = predictions[0]?.className.split(",")[0];
        console.log("Detected food:", detectedFood);

        const response = await fetch(
          `https://api.spoonacular.com/food/ingredients/search?query=${detectedFood}&apiKey=7d5e750167ac4dc0b0f4032102e970de`
        );
        if (!response.ok) throw new Error("Failed to fetch nutrition data");

        const nutritionData = await response.json();
        console.log("Spoonacular API Response:", nutritionData);

        if (!nutritionData.results.length) {
          setAnalysis("No nutritional data found for this food.");
        } else {
          setAnalysis(nutritionData.results[0]);
        }
      };
      img.onerror = () => {
        console.error("Error loading image");
        setAnalysis("Error loading image. Try another one.");
        setLoading(false);
      };
    } catch (error) {
      console.error("Error analyzing image:", error);
      setAnalysis("An error occurred during analysis. Check console logs.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        padding: "16px",
      }}
    >
      {!image ? (
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={{ facingMode: "environment" }}
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        />
      ) : (
        <img
          src={image}
          alt="Captured food"
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            width: "256px",
          }}
        />
      )}
      <div style={{ display: "flex", gap: "8px" }}>
        {!image ? (
          <>
            <Button variant="contained" onClick={capture}>
              Capture Image
            </Button>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="upload-file"
              onChange={handleFileUpload}
            />
            <label htmlFor="upload-file">
              <Button variant="outlined" component="span">
                Upload Image
              </Button>
            </label>
          </>
        ) : (
          <Button variant="outlined" onClick={() => setImage(null)}>
            Capture Another Image
          </Button>
        )}
        {image && (
          <Button variant="contained" onClick={analyzeImage} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Analyze Image"}
          </Button>
        )}
      </div>
      {analysis && (
        <Card style={{ width: "320px", padding: "16px" }}>
          <CardContent>
            <Typography variant="h6">Analysis Results</Typography>
            {typeof analysis === "string" ? (
              <Typography>{analysis}</Typography>
            ) : (
              <div>
                <Typography>
                  <strong>Ingredient Name:</strong> {analysis.name}
                </Typography>
                <Typography>
                  <strong>Calories:</strong>{" "}
                  {analysis.calories || "Not Available"}
                </Typography>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FoodAnalyzer;
