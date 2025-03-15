import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import {
  Box,
  Button,
  Paper,
  Typography,
  Grid,
  Stack,
  CircularProgress,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import axios from "axios";

const FoodAnalyzer = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [model, setModel] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [analyzedInfo, setAnalyzedInfo] = useState({});
  const [postResponse, setPostResponse] = useState();

  useEffect(() => {
    const loadModel = async () => {
      await tf.setBackend("webgl");
      await tf.ready();
      const loadedModel = await mobilenet.load({ version: 2, alpha: 1.0 });
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
      setShowWebcam(false);
    }
  };

  ////////////////////////////// Post Image to API //////////////////////////

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const postAPI = async (imageFile) => {
    let response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAnKgAF69LPmgVVKxfu3tBKXEvtcrF3Ka4`,
      {
        contents: [
          {
            parts: [
              {
                text: `Calculate Calories and Nutrition Values in This Photo in json
                                    
                      like this: {
                      "dish": "Tofu Scramble with Roasted Potatoes" or "لم يتم التعرف على أي طعام",
                      },
                      "nutrition": {
                        "calories": {
                        "total": 600, 
                        "breakdown": {
                          "tofu_scramble": 300,
                          "roasted_potatoes": 300
                        },
                        "protein": {
                          "grams": 30,
                          "source": "tofu, potatoes"
                        },
                        "carbohydrates": {
                          "grams": 50,
                          "source": "potatoes"
                        },
                        "fat": {
                          "grams": 20,
                          "source": "tofu, potatoes"
                        }, 
                        "carbs": {
                          "grams": 10,
                          "source": "potatoes"
                        },
                        "vitamins":[
                          "vitamin A: present in potatoes and possibly vegetables in scramble,"
                          "vitamin C: present in potatoes and possibly vegetables in scramble,"
                          "vitamin D: present in potatoes"
                        ],
                      }

                      without note or "\`\`\`json" and "\`\`\`" at the end of the text.
                      and translate the proprities values to Arabic Language
                `,
              },
              {
                inline_data: {
                  mime_type: "image/jpeg",
                  data: imageFile,
                },
              },
            ],
          },
        ],
      }
    );

    setPostResponse(response.data.candidates[0].content.parts[0].text);
      };

  function cleanJSONFormat(text) {
    if (typeof text !== "string") {
      console.error("Error: input is not a string", text);
      return "";
    }

    let CleanAPI = text.replace(/^```json\s*|```[\s\n]*$/g, "").trim();

    let firstCurly = CleanAPI.indexOf("{");
    let lastCurly = CleanAPI.lastIndexOf("}");

    if (firstCurly === -1 || lastCurly === -1) {
      console.error("Error: JSON structure not found");
      return null;
    }

    CleanAPI = CleanAPI.slice(firstCurly, lastCurly + 1);
        try {
      return JSON.parse(CleanAPI);
    } catch (error) {
      console.error("Error: Invalid JSON format", error);
      return null;
    }
  }

  useEffect(() => {
    if (image) {
      postAPI(image.split(",")[1]);
    }
      }, [image]);

  useEffect(() => {
    if (postResponse) {
            setAnalyzedInfo(cleanJSONFormat(postResponse));
    }
  }, [postResponse]);

  ////////////////////////////////////////////////////////////////////////

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
              height: "220px",
              objectFit: "cover",
              loading: "eager",
              fetchpriority: "high",
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
            height: "220px",
            objectFit: "cover",
          }}
        />
      )}
      <div style={{ display: "flex", gap: "8px" }}>
        {!image ? (
          <>
            {showWebcam ? (
              <Stack gap={2}>
                <Button
                  variant="contained"
                  onClick={capture}
                  startIcon={<CameraAlt />}
                  sx={{ pr: "5px" }}
                ></Button>
                <Button variant="outlined" onClick={() => setShowWebcam(false)}>
                  جرب خيار آخر
                </Button>
              </Stack>
            ) : (
              <>
                <Button variant="contained" onClick={() => setShowWebcam(true)}>
                  إلتقط صورة
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
                    إرفع ملف
                  </Button>
                </label>
              </>
            )}
          </>
        ) : (
          <Button
            variant="outlined"
            onClick={() => (setImage(null), setAnalyzedInfo({}))}
          >
            إختر صورة أخرى
          </Button>
        )}
      </div>
      {image ? (
        analyzedInfo?.dish ? (
          <Box sx={{ width: "100%", padding: 2 }}>
            <Grid container spacing={2} alignItems={"stretch"}>
              <Grid item xs={12} sm={12}>
                <Paper
                  sx={{
                    padding: 2,
                    borderRadius: 3,
                    backgroundColor: "#fbf6fe",
                    textAlign: "center",
                    border: "3px solid #A34BCE",
                  }}
                >
                  <Typography variant="h6" color="#A34BCE">
                    الوجبات المكتشفة
                  </Typography>
                  <Typography>{analyzedInfo.dish}</Typography>
                </Paper>
              </Grid>
              {analyzedInfo.dish !== "لم يتم التعرف على أي طعام" ? (
                <Grid item xs={12} sm={12}>
                  <Paper
                    sx={{
                      padding: 2,
                      borderRadius: 3,
                      backgroundColor: "#fbf6fe",
                      height: "90%",
                      borderBottom: "3px solid #A34BCE",
                    }}
                  >
                    <Typography variant="h6" color="#A34BCE">
                      السعرات الحرارية
                    </Typography>
                    <Typography sx={{ mb: 1, fontWeight: "500" }}>
                      {analyzedInfo?.nutrition?.calories?.total === null
                        ? "غير محدد سعر حراري"
                        : analyzedInfo?.nutrition?.calories?.total +
                          " سعر حراري"}
                    </Typography>
                    {analyzedInfo?.nutrition?.calories?.breakdown &&
                      Object.keys(analyzedInfo?.nutrition?.calories?.breakdown)
                        .length > 0 && (
                        <Stack spacing={0}>
                          <Typography variant="body1" color="#A34BCE">
                            المكونات:
                          </Typography>
                          {Object.keys(
                            analyzedInfo?.nutrition?.calories?.breakdown
                          ).map((key) => (
                            <Typography
                              sx={{ textTransform: "capitalize" }}
                              key={key}
                            >
                              <span style={{ mb: 1, fontWeight: "500" }}>
                                {key}{" "}
                              </span>
                              {
                                analyzedInfo?.nutrition?.calories?.breakdown[
                                  key
                                ]
                              }
                              <br />
                            </Typography>
                          ))}
                        </Stack>
                      )}
                  </Paper>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
            {analyzedInfo.dish !== "لم يتم التعرف على أي طعام" &&
            analyzedInfo?.nutrition?.calories?.total !== null &&
            analyzedInfo?.nutrition?.vitamins ? (
              <Grid container spacing={3} alignItems={"stretch"} mt={1}>
                <Grid item xs={12} sm={12}>
                  <Paper
                    sx={{
                      padding: 2,
                      borderRadius: 3,
                      backgroundColor: "#fbf6fe",
                      height: "90%",
                      borderBottom: "3px solid #A34BCE",
                    }}
                  >
                    <Typography variant="h6" color="#A34BCE">
                      فيتامينات
                    </Typography>
                    {analyzedInfo?.nutrition?.vitamins?.map((key) => (
                      <Typography
                        sx={{ textTransform: "capitalize" }}
                        key={key}
                      >
                        <span style={{ mb: 1, fontWeight: "500" }}>{key}</span>{" "}
                      </Typography>
                    ))}
                  </Paper>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <Paper
                    sx={{
                      padding: 2,
                      borderRadius: 3,
                      backgroundColor: "#fbf6fe",
                      mt: 1,
                      borderBottom: "3px solid #A34BCE",
                    }}
                  >
                    <Typography variant="h6" color="#A34BCE">
                      بروتين
                    </Typography>
                    <Typography sx={{ mb: 1, fontWeight: "500" }}>
                      {analyzedInfo?.nutrition?.protein?.grams || 0}جم
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <Paper
                    sx={{
                      padding: 2,
                      borderRadius: 3,
                      backgroundColor: "#fbf6fe",
                      mt: 1,
                      borderBottom: "3px solid #A34BCE",
                    }}
                  >
                    <Typography variant="h6" color="#A34BCE">
                      كربوهيدرات
                    </Typography>
                    <Typography sx={{ mb: 1, fontWeight: "500" }}>
                      {analyzedInfo?.nutrition?.carbohydrates?.grams || 0}جم
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={6} sm={4}>
                  <Paper
                    sx={{
                      padding: 2,
                      borderRadius: 3,
                      backgroundColor: "#fbf6fe",
                      mt: 1,
                      borderBottom: "3px solid #A34BCE",
                    }}
                  >
                    <Typography variant="h6" color="#A34BCE">
                      دهون
                    </Typography>
                    <Typography sx={{ mb: 1, fontWeight: "500" }}>
                      {analyzedInfo?.nutrition?.fat?.grams || 0}جم
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            ) : (
              ""
            )}
          </Box>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "250px",
            }}
          >
            <CircularProgress />
            <Typography variant="body1" color="#A34BCE" mt={2}>
              جار تحليل الصورة...
            </Typography>
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default FoodAnalyzer;
