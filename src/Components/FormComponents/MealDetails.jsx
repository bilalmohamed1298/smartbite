import {
  Box,
  Button,
  CircularProgress,
  createTheme,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const MealDetails = () => {
  const [MealDetails, setMealDetails] = useState({});
  const [nutritionWidget, setNutritionWidget] = useState({});
  const [Summary, setSummary] = useState("");
  const [Title, setTitle] = useState("");
  const [Ingredients, setIngredients] = useState([]);
  const { id } = useParams();

  const getMealDetails = async () => {
    try {
      let details = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=e1960c2436914b008fd31c03c84e51b4`
      );
      let widget = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=e1960c2436914b008fd31c03c84e51b4`
      );
  
      setMealDetails(details.data);
      setNutritionWidget(widget.data);
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
  };

  useEffect(() => {
    getMealDetails();
  }, [id]);

  ///////////////////////// Summary ////////////////////////////

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    TitleTranslator(MealDetails.title);
    if (MealDetails.summary) {
      SummaryTranslator(stripHtmlTags(MealDetails.summary));
    }

  }, [MealDetails.summary, nutritionWidget.ingredients]);


  //////////////////////////////////////////////////////////////////////

  /////////////////////////////// Translator ///////////////////////////

  const SummaryTranslator = async (textToTranslate) => {
    let response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAnKgAF69LPmgVVKxfu3tBKXEvtcrF3Ka4`,
      {
        contents: [
          {
            parts: [
              {
                text: `Translate the following text to Arabic:
                    
                    "${textToTranslate}"
                    
                    Only return the translated text without extra comments or formatting.
                  `,
              },
            ],
          },
        ],
      }
    );
    setSummary(response.data.candidates[0].content.parts[0].text);
  };

  const TitleTranslator = async (textToTranslate) => {
    let response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAnKgAF69LPmgVVKxfu3tBKXEvtcrF3Ka4`,
      {
        contents: [
          {
            parts: [
              {
                text: `Translate the following text to Arabic:
                    
                    "${textToTranslate}"
                    
                    Only return the translated text without extra comments or formatting.
                  `,
              },
            ],
          },
        ],
      }
    );
    setTitle(response.data.candidates[0].content.parts[0].text);
  };



  //////////////////////////////////////////////////////////////////////
  const theme = createTheme({
    palette: {
      primary: {
        main: "#A34BCE",
        color: "#fff",
      },
    },
  });

  return (
    <Box>
      {Object.keys(MealDetails).length > 0 ? (
        <Box>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: "270px",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            <Link to={"/diet-meals"}>
              <Button
                variant="contained"
                color="error"
                sx={{
                  position: "absolute",
                  zIndex: 1,
                  p: 0,
                  borderRadius: "50px",
                  minWidth: "30px",
                  m: "3px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                X
              </Button>
            </Link>
            <img
              src={`${MealDetails.image}`}
              alt="Meal"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
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

              {
                Title !== "غير معرف" ?(
                  <Typography
                  variant="h6"
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 20,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {MealDetails.title}
                </Typography>
                ):''
              }
          </Box>

          <Stack sx={{}}>
            <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
              معلومات الوجبة
            </Typography>
            {Summary !== ""?(
              <Typography
              color="textSecondary"
              my={2}
              sx={{
                fontSize: { xs: "14px", sm: "18px" },
              }}
              >{Summary}</Typography>
            ):(
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "200px",
                }}
              >
                <CircularProgress />
              </div>
            )}
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              mt: 5,
              flexWrap: "wrap",
              gap: 2,
              justifyContent: { xs: "center", sm: "start" },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                height: "50px",
                boxShadow: 2,
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                background: "#fbf6fe",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: "500",
                  mb: "4px",
                }}
              >
                سعرات حرارية
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {parseInt(nutritionWidget.calories)}جم
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                height: "auto",
                boxShadow: 2,
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                background: "#fbf6fe",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: "500",
                  mb: "4px",
                }}
              >
                كاربوهيدرات
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {parseInt(nutritionWidget.carbs)}جم
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                height: "auto",
                boxShadow: 2,
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                background: "#fbf6fe",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: "500",
                  mb: "4px",
                }}
              >
                دهون
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {parseInt(nutritionWidget.fat)}جم
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                height: "auto",
                boxShadow: 2,
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                background: "#fbf6fe",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: "500",
                  mb: "4px",
                }}
              >
                بروتين
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {parseInt(nutritionWidget.protein)}جم
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction={"row"}
            sx={{
              mt: 3,
              flexWrap: "wrap",
              gap: 2,
              justifyContent: { xs: "center", sm: "start" },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                height: "auto",
                boxShadow: 2,
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                background: "#fbf6fe",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: "500",
                  mb: "4px",
                }}
              >
                نسبة الكربوهيدرات
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {nutritionWidget.caloricBreakdown.percentCarbs}%
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                height: "auto",
                boxShadow: 2,
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                background: "#fbf6fe",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: "500",
                  mb: "4px",
                }}
              >
                نسبة الدهون
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {nutritionWidget.caloricBreakdown.percentFat}%
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                height: "auto",
                boxShadow: 2,
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                background: "#fbf6fe",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: "500",
                  mb: "4px",
                }}
              >
                نسبة البروتين
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {nutritionWidget.caloricBreakdown.percentProtein}%
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                height: "auto",
                boxShadow: 2,
                p: 1,
                textAlign: "center",
                borderRadius: 2,
                background: "#fbf6fe",
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "14px", sm: "15px" },
                  fontWeight: "500",
                  mb: "4px",
                }}
              >
                الوزن لكل حصة
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {nutritionWidget.weightPerServing.amount}جم
              </Typography>
            </Box>
          </Stack>
        </Box>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "700px",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </Box>
  );
};

export default MealDetails;
