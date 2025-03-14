import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { MealsContext } from "../../Utils/MealsContext";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { CameraAlt } from "@mui/icons-material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import axios from "axios";
import FoodAnalyzer from "./FoodAnalayzer";
import MealDetails from "./MealDetails";
import VitaminRecommendations from "./VitaminRecommendations";

const DietMeals = () => {
  const {
    dailyMeals,
    dailyNutrients,
    toggleMealsChange,
    mealsChange,
    localMealsCalories,
    specialNutrients,
    vitaminDeficiencies,
  } = useContext(MealsContext);
  const [Title, setTitle] = useState("");


  let localUserDetails = JSON.parse(localStorage.getItem("userDetails"));


  ///////////////////////// APITranslation //////////////////////

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


  useEffect(() => {
    TitleTranslator()
  
  }, [])
  

  ///////////////////////////////////////////////////////////////

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "20px",
          mb: 2,
        }}
      >
      📋 بياناتك الشخصية
      </Typography>
      <Box>
        <Stack
          direction={"row"}
          sx={{
            flexWrap: "wrap",
            gap: { xs: 1, md: 2 },
            mb: { xs: 3, sm: 5 },
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              boxShadow: 2,
              p: 1,
              height: "auto",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              background: "#fbf6fe",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "13px", sm: "16px" },
                ml: { xs: 0, sm: 1 },
                mb: "5px",
                textAlign: { xs: "center", sm: "start" },
              }}
            >
              العمر
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: { xs: "15px", md: "24px" },
                textAlign: "center",
                color: "#A34BCE",
              }}
            >
              {localUserDetails.age}{' '}
              <span style={{ fontSize: "14px", marginLeft: "5px" }}>سنة</span>
            </Typography>
          </Box>
          <Box
            sx={{
              boxShadow: 2,
              p: 1,
              height: "auto",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              background: "#fbf6fe",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "13px", sm: "16px" },
                ml: { xs: 0, sm: 1 },
                mb: "5px",
                textAlign: { xs: "center", sm: "start" },
              }}
            >
              الطول
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: { xs: "15px", md: "24px" },
                textAlign: "center",
                color: "#A34BCE",
              }}
            >
              {localUserDetails.height}
              <span style={{ fontSize: "14px", marginLeft: "5px" }}>سم</span>
            </Typography>
          </Box>
          <Box
            sx={{
              boxShadow: 2,
              p: 1,
              height: "auto",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              background: "#fbf6fe",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "13px", sm: "16px" },
                ml: { xs: 0, sm: 1 },
                mb: "5px",
                textAlign: { xs: "center", sm: "start" },
              }}
            >
              الوزن
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: { xs: "15px", md: "24px" },
                textAlign: "center",
                color: "#A34BCE",
              }}
            >
              {localUserDetails.weight}
              <span style={{ fontSize: "14px", marginLeft: "5px" }}>كجم</span>
            </Typography>
          </Box>
          <Box
            sx={{
              boxShadow: 2,
              p: 1,
              height: "auto",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              background: "#fbf6fe",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "13px", sm: "16px" },
                ml: { xs: 0, sm: 1 },
                mb: "5px",
                textAlign: { xs: "center", sm: "start" },
              }}
            >
              الهدف
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: { xs: "15px", md: "24px" },
                textAlign: "center",
                color: "#A34BCE",
              }}
            >
              {localUserDetails.idealWeight}
              <span style={{ fontSize: "14px", marginLeft: "5px" }}>كجم</span>
            </Typography>
          </Box>
          <Box
            sx={{
              boxShadow: 2,
              p: 1,
              height: "auto",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              background: "#fbf6fe",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "13px", sm: "16px" },
                ml: { xs: 0, sm: 1 },
                mb: "5px",
                textAlign: { xs: "center", sm: "start" },
              }}
            >
              المدة
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: { xs: "15px", md: "24px" },
                textAlign: "center",
                color: "#A34BCE",
              }}
            >
              {localUserDetails.duration}{' '}
              <span style={{ fontSize: "14px", marginLeft: "1px" }}>يوم</span>
            </Typography>
          </Box>
        </Stack>
        {localUserDetails.age &&
        localUserDetails.weight &&
        localUserDetails.height &&
        localUserDetails.idealWeight &&
        localUserDetails.duration ? (
          <Typography sx={{ mb: 3, display: { xs: "block", md: "block" } }}>
            {localUserDetails.goal === "خسارة الوزن" ? (
              <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
                دعنا نساعدك للوصول لهدفك بخسارة
                <span style={{ color: "#A34BCE", fontWeight: "600" }}>
                  {""}{" "}
                  {Math.abs(
                    localUserDetails.weight - localUserDetails.idealWeight
                  )}
                  كجم
                </span>{" "}
                دهون خلال{" "}
                <span style={{ color: "#A34BCE", fontWeight: "600" }}>
                  {localUserDetails.duration} يوم
                </span>{" "}
                🔥
              </Typography>
            ) : localUserDetails.goal === "زيادة العضلات" ? (
              <Typography>
                دعنا نساعدك للوصول لهدفك بزايدة
                <span style={{ color: "#A34BCE", fontWeight: "600" }}>
                  {""}{" "}
                  {Math.abs(
                    localUserDetails.idealWeight - localUserDetails.weight
                  )}
                  كجم
                </span>{" "}
                عضلات خلال{" "}
                <span style={{ color: "#A34BCE", fontWeight: "600" }}>
                  {localUserDetails.duration} يوم
                </span>{" "}
                💪
              </Typography>
            ) : (
              ""
            )}
          </Typography>
        ) : (
          <Typography variant="body2" color="error">
            من فضلك اكمل البيانات الناقصة!
          </Typography>
        )}
      </Box>
      <hr style={{ opacity: "40%" }} />

      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Typography
          sx={{
            mt: 1,
            fontWeight: "600",
            fontSize: "20px",
          }}
        >
        🥗  وجبات اليوم
        </Typography>

        <Button
          onClick={toggleMealsChange}
          variant="contained"
          sx={{
            mt: "auto",
            mr: 1,
            borderRadius: 2,
            background: "#A34BCE",
            color: "#fff",
            p: "5px",
          }}
        >
          <RestaurantIcon sx={{ ml: 1, textAlign: "center" }} fontSize="14" />
          <Typography sx={{ fontSize: "12px" }}>تغيير الوجبات</Typography>
        </Button>
      </Stack>
      <Typography mb={0}>
        السعرات المطلوبة: {localMealsCalories.toFixed(0)}
      </Typography>
      {Object.keys(dailyNutrients).length > 0 ? (
        <Stack
          direction={"row"}
          sx={{
            mt: 2,
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
              borderRadius: 10,
              background: "#fff",
              border: "1px solid #A34BCE",
              width: "100px",
              borderBottom: "2px solid #A34BCE",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                fontSize: { xs: "14px", sm: "16px" },
                color: "#A34BCE",
              }}
            >
              {Number(dailyNutrients.calories.toFixed(0)) +
                specialNutrients.specialCalories}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
                fontWeight: "500",
                mb: "4px",
              }}
            >
              سعر حراري
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              height: "auto",
              boxShadow: 2,
              p: 1,
              textAlign: "center",
              borderRadius: 10,
              background: "#fff",
              border: "1px solid #A34BCE",
              width: "100px",
              borderBottom: "2px solid #A34BCE",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                fontSize: { xs: "14px", sm: "16px" },
                color: "#A34BCE",
              }}
            >
              {Number(dailyNutrients.carbohydrates.toFixed(0)) +
                parseInt(specialNutrients.specialCarbs)}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
                fontWeight: "500",
                mb: "4px",
              }}
            >
              كربوهيدرات
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              height: "auto",
              boxShadow: 2,
              p: 1,
              textAlign: "center",
              borderRadius: 10,
              background: "#fff",
              border: "1px solid #A34BCE",
              width: "100px",
              borderBottom: "2px solid #A34BCE",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                fontSize: { xs: "14px", sm: "16px" },
                color: "#A34BCE",
              }}
            >
              {Number(dailyNutrients.fat.toFixed(0)) +
                parseInt(specialNutrients.specialFat)}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
                fontWeight: "500",
                mb: "4px",
              }}
            >
              دهون
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              height: "auto",
              boxShadow: 2,
              p: 1,
              textAlign: "center",
              borderRadius: 10,
              background: "#fff",
              border: "1px solid #A34BCE",
              width: "100px",
              borderBottom: "2px solid #A34BCE",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                fontSize: { xs: "14px", sm: "16px" },
                color: "#A34BCE",
              }}
            >
              {Number(dailyNutrients.protein.toFixed(0)) +
                parseInt(specialNutrients.specialProtein)}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
                fontWeight: "500",
                mb: "4px",
              }}
            >
              بروتين
            </Typography>
          </Box>
        </Stack>
      ) : (
        ""
      )}
      <Box>
        {dailyMeals.length > 0 ? (
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            justifyContent={{ xs: "center", md: "start" }}
            sx={{ my: { xs: 3, sm: 4 }, gap: { xs: 3, md: 4 } }}
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
                    width: { xs: "340px", sm: "360px" },
                    height: "180px",
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: 2,
                    "&:hover": { scale: 1.1 },
                    transition: "0.3s ease-in-out",
                  }}
                >
                  <img
                    src={
                      meal.image.startsWith("http")
                        ? meal.image
                        : `https://img.spoonacular.com/recipes/${meal.image}`
                    }
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
            }}
          >
            <CircularProgress />
          </div>
        )}
      </Box>
      <hr style={{ opacity: "40%" }} />
      <VitaminRecommendations />
    </Box>
  );
};

export default DietMeals;
