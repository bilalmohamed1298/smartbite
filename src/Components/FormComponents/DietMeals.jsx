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

const DietMeals = () => {
  const {
    dailyMeals,
    dailyNutrients,
    toggleMealsChange,
    userDetails,
    mealsChange,
    localMealsCalories,
  } = useContext(MealsContext);
  const [dailyWidgets1, setDailyWidgets1] = useState({});
  const [dailyWidgets2, setDailyWidgets2] = useState({});
  const [dailyWidgets3, setDailyWidgets3] = useState({});
  const [open1, setOpen1] = useState(false);
  let localUserDetails = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "20px",
          mb: 2,
        }}
      >
        Your Profile
      </Typography>
      <Box>
        <Stack
          direction={"row"}
          sx={{ flexWrap: "wrap", gap: { xs: 1, md: 2 }, mb: { xs: 3, sm: 5 } }}
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
              Age
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: { xs: "15px", md: "24px" },
                textAlign: "center",
                color: "#A34BCE",
              }}
            >
              {localUserDetails.age}
              <span style={{ fontSize: "14px", marginLeft: "5px" }}>years</span>
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
              Height
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
              <span style={{ fontSize: "14px", marginLeft: "5px" }}>cm</span>
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
              Weight
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
              <span style={{ fontSize: "14px", marginLeft: "5px" }}>kg</span>
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
              Goal
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
              <span style={{ fontSize: "14px", marginLeft: "5px" }}>kg</span>
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
              Duration
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: { xs: "15px", md: "24px" },
                textAlign: "center",
                color: "#A34BCE",
              }}
            >
              {localUserDetails.duration}
              <span style={{ fontSize: "14px", marginLeft: "1px" }}>days</span>
            </Typography>
          </Box>
        </Stack>
        {localUserDetails.age &&
        localUserDetails.weight &&
        localUserDetails.height &&
        localUserDetails.idealWeight &&
        localUserDetails.duration ? (
          <Typography sx={{ mb: 3, display: { xs: "block", md: "block" } }}>
            {localUserDetails.goal === "Losing weight" ? (
              <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
                Let us help you achieve your goal by losing
                <span style={{ color: "#A34BCE", fontWeight: "600" }}>
                  {""}{" "}
                  {Math.abs(
                    localUserDetails.weight - localUserDetails.idealWeight
                  )}
                  kg
                </span>{" "}
                within{" "}
                <span style={{ color: "#A34BCE", fontWeight: "600" }}>
                  {localUserDetails.duration} days
                </span>{" "}
                💪🔥
              </Typography>
            ) : localUserDetails.goal === "Gaining muscle" ? (
              <Typography>
                Let us help you achieve your goal by gaining
                <span style={{ color: "#A34BCE", fontWeight: "600" }}>
                  {""}{" "}
                  {Math.abs(
                    localUserDetails.idealWeight - localUserDetails.weight
                  )}
                  kg
                </span>{" "}
                within{" "}
                <span style={{ color: "#A34BCE", fontWeight: "600" }}>
                  {localUserDetails.duration} days
                </span>{" "}
                💪🔥
              </Typography>
            ) : (
              ""
            )}
          </Typography>
        ) : (
          <Typography variant="body2" color="error">
            Please complete the missing information!
          </Typography>
        )}
      </Box>
      <hr style={{ opacity: "40%" }} />

      <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
        <Typography
          sx={{
            mt: 2,
            fontWeight: "600",
            fontSize: "20px",
          }}
        >
          Today's Meals
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
          <RestaurantIcon sx={{ mr: 1, textAlign: "center" }} fontSize="14" />
          <Typography sx={{ fontSize: "12px" }}>Change Meals</Typography>
        </Button>
      </Stack>
      <Typography>
        Calculated Calories: {localMealsCalories.toFixed(0)}
      </Typography>
      {Object.keys(dailyNutrients).length > 0 ? (
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
              borderRadius: 10,
              background: "#fff",
              border: "1px solid #A34BCE",
              width: "100px",
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
              {dailyNutrients.calories.toFixed(0)}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
                fontWeight: "500",
                mb: "4px",
              }}
            >
              Calories
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
              {dailyNutrients.carbohydrates.toFixed(0)}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
                fontWeight: "500",
                mb: "4px",
              }}
            >
              Carbs
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
              {dailyNutrients.fat.toFixed(0)}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
                fontWeight: "500",
                mb: "4px",
              }}
            >
              Fat
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
              {dailyNutrients.protein.toFixed(0)}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "14px" },
                fontWeight: "500",
                mb: "4px",
              }}
            >
              Protein
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
            justifyContent={{ xs: "center", md: "space-evenly" }}
            sx={{ mt: { xs: 3, sm: 4 }, gap: { xs: 3, md: 3 } }}
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
                    width: "290px",
                    height: "180px",
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: 2,
                    "&:hover": { scale: 1.1 },
                    transition: "0.3s ease-in-out",
                  }}
                >
                  <img
                    src={`https://spoonacular.com/recipeImages/${meal.image}`}
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
      <Box sx={{textTransform:'capitalize'}}>
        <Typography
          sx={{
            mt: 5,
            mb: 2,
            fontWeight: "600",
            fontSize: "20px",
          }}
        >
          Examples of suggested foods
        </Typography>
        <Typography sx={{fontSize:{xs:'16px',sm:'16px'}}}><span style={{fontWeight:'600'}}>Iron:</span> spinach, lentils, red meat, liver, nuts.</Typography>
        <Typography sx={{fontSize:{xs:'16px',sm:'16px'}}}><span style={{fontWeight:'600'}}>Vitamin B12:</span> fish, eggs, milk, liver, cheese.</Typography>
        <Typography sx={{fontSize:{xs:'16px',sm:'16px'}}}><span style={{fontWeight:'600'}}>Vitamin D:</span> fatty fish, eggs, dairy</Typography>
        <Typography sx={{fontSize:{xs:'16px',sm:'16px'}}}><span style={{fontWeight:'600'}}>Calcium:</span> milk, cheese, sardines, leafy greens.</Typography>
      </Box>
    </Box>
  );
};

export default DietMeals;
