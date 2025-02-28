import React, { useState, useRef, useEffect, useContext } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { MealsContext } from "../../Utils/MealsContext";
import axios from "axios";

const FoodAnalyzer = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [dailyMeals, setdailyMeals] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  


  useEffect(() => {
    const loadModel = async () => {
      await tf.setBackend("webgl");
      await tf.ready();
      const loadedModel = await mobilenet.load({ version: 2, alpha: 1.0 });
      setModel(loadedModel);
      console.log("Model Loaded Successfully");
    };
    loadModel();
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setAnalysis(null);
    setShowWebcam(false);
  };


  const preprocessImage = async (imageSrc) => {
    const img = new Image();
    img.src = imageSrc;
    await new Promise((resolve) => (img.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 640;
    canvas.height = 480;
    ctx.drawImage(img, 0, 0, 640, 480);
    ctx.filter = "contrast(1.2) brightness(1.1)";
    ctx.drawImage(img, 0, 0, 640, 480);
    return canvas.toDataURL("image/png");
  };

  const analyzeImage = async () => {
    if (!image || !model) return;
    setLoading(true);
    setAnalysis(null);
    const enhancedImage = await preprocessImage(image);
    const img = new Image();
    img.src = enhancedImage;
    img.crossOrigin = "anonymous";

    img.onload = async () => {
      const predictions = await model.classify(img);
      console.log("Predictions:", predictions);

      if (!predictions.length) {
        setAnalysis("Food could not be accurately identified.");
        setLoading(false);
        return;
      }

      const detectedIngredients = predictions
        .map((pred) => pred.className)
        .filter(Boolean)
        .join(",");

      const detectedFood = predictions[1]?.className.split(",")[0];
      console.log("Detected food:", detectedFood);

      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?query=${detectedFood}&apiKey=e1960c2436914b008fd31c03c84e51b4`
        );
        if (!response.ok) throw new Error("Failed to fetch nutrition data");

        const nutritionData = await response.json();
        console.log("Spoonacular API Response:", nutritionData);

        if (!nutritionData.results.length) {
          setAnalysis("No nutritional data found for this food.");
        } else {
          setAnalysis(nutritionData.results[0]);
          setdailyMeals(nutritionData.results);
          setIngredients(detectedIngredients);
        }
      } catch (error) {
        console.error("Error fetching nutrition data:", error);
        setAnalysis("An error occurred while fetching nutrition data.");
      }
      setLoading(false);
    };
  };



//////////////////////////// Image Analyzer //////////////////////////////

  ////////////////////////////////////////////////////////

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };


  const [postReponse, setpostReponse] = useState()

  const postAPI = async (imageFile) => {
    let response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAnKgAF69LPmgVVKxfu3tBKXEvtcrF3Ka4`,
      {
        contents: [
          {
            parts: [
              {
                text: "Calculate Calories and Nutrition Values in This Photo in json",
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: imageFile
                },
              },
            ],
          },
        ],
      }
    );

    setpostReponse(response)
  };

  useEffect(() => {
    postAPI(image)
    console.log(image)
  }, [image])

  useEffect(() => {
    console.log(postReponse)

  }, [postReponse])
  

  //////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////



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
        showWebcam ? (
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/png"
            videoConstraints={{ facingMode: "environment" }}
            style={{ width: "100%", height: "250px", borderRadius: "8px" }}
          />
        ) : (
          <img
            src={"/analyzer.webp"}
            alt="Captured food"
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              width: "100%",
              height: "250px",
              objectFit: "cover",
            }}
          />
        )
      ) : (
        <img
          src={image}
          alt="Captured food"
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            width: "100%",
            height: "250px",
            objectFit: "cover",
          }}
        />
      )}
      <div style={{ display: "flex", gap: "8px" }}>
        {!image ? (
          <>
            <Button
              variant="contained"
              onClick={() => {
                capture;
                setShowWebcam(true);
              }}
            >
              Capture Image
            </Button>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id={"image-file"}
              onChange={handleFileUpload}
            />
            <label htmlFor="image-file">
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
        <Card style={{ width: "100%", padding: "16px" }}>
          <CardContent>
            <Typography variant="h6">Results</Typography>
            {typeof analysis === "string" ? (
              <Typography>{analysis}</Typography>
            ) : (
              <div>
                {dailyMeals.length > 0 ? (
                  <Stack
                    direction={"row"}
                    flexWrap={"wrap"}
                    justifyContent={{ xs: "center", md: "start" }}
                    sx={{
                      mt: { xs: 5, sm: 5 },
                      gap: { xs: 3, md: 3 },
                      flexGrow: 1,
                    }}
                  >
                    {dailyMeals.map((meal, index) => (
                      <Link
                        key={index}
                        to={`/meal-details/${meal.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Box
                          sx={{
                            position: "relative",
                            width: "250px",
                            height: "180px",
                            borderRadius: "15px",
                            overflow: "hidden",
                            boxShadow: 2,
                            "&:hover": { scale: 1.1 },
                            transition: "0.3s ease-in-out",
                          }}
                        >
                          <img
                            src={`${meal.image}`}
                            alt="Meal"
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                          />

                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              background:
                                "linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.18))",
                            }}
                          />

                          <Typography
                            variant="body1"
                            sx={{
                              position: "absolute",
                              bottom: 10,
                              left: 10,
                              color: "white",
                              fontWeight: "bold",
                            }}
                          >
                            {meal.title}
                          </Typography>
                        </Box>
                      </Link>
                    ))}
                  </Stack>
                ) : (
                  ""
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FoodAnalyzer;
