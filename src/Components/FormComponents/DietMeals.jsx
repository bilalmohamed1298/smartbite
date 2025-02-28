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
import { Link } from "react-router-dom";
import { CameraAlt } from "@mui/icons-material";
import axios from "axios";
import FoodAnalyzer from "./FoodAnalayzer";

const DietMeals = () => {
  const { dailyMeals, userDetails, mealsCalories } = useContext(MealsContext);
  const [dailyWidgets1, setDailyWidgets1] = useState({});
  const [dailyWidgets2, setDailyWidgets2] = useState({});
  const [dailyWidgets3, setDailyWidgets3] = useState({});
  let localUserDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [open, setOpen] = useState(false);

  ////////////////////////// Nutrition Widgets APIs //////////////////////////

  const getDailyWidgets = async () => {
    let dw1 = await axios.get(
      `https://api.spoonacular.com/recipes/${dailyMeals[0].id}/nutritionWidget.json?apiKey=e1960c2436914b008fd31c03c84e51b4`
    );
    let dw2 = await axios.get(
      `https://api.spoonacular.com/recipes/${dailyMeals[1].id}/nutritionWidget.json?apiKey=e1960c2436914b008fd31c03c84e51b4`
    );
    let dw3 = await axios.get(
      `https://api.spoonacular.com/recipes/${dailyMeals[2].id}/nutritionWidget.json?apiKey=e1960c2436914b008fd31c03c84e51b4`
    );

    setDailyWidgets1(dw1.data);
    setDailyWidgets2(dw2.data);
    setDailyWidgets3(dw3.data);
  };

  const dailyCalories =
    parseFloat(dailyWidgets1.calories) +
    parseFloat(dailyWidgets2.calories) +
    parseFloat(dailyWidgets3.calories);
  const dailyCarbs =
    parseFloat(dailyWidgets1.carbs) +
    parseFloat(dailyWidgets2.carbs) +
    parseFloat(dailyWidgets3.calories);
  const dailyFat =
    parseFloat(dailyWidgets1.fat) +
    parseFloat(dailyWidgets2.fat) +
    parseFloat(dailyWidgets3.fat);
  const dailyProtein =
    parseFloat(dailyWidgets1.protein) +
    parseFloat(dailyWidgets2.protein) +
    parseFloat(dailyWidgets3.protein);

  useEffect(() => {
    getDailyWidgets();
  }, [dailyMeals]);

  useEffect(() => {
    console.log(dailyWidgets1);
    console.log(dailyWidgets2);
    console.log(dailyWidgets3);
  }, [dailyWidgets1]);

  ////////////////////////////////////////////////////////////////////////////
  return (
    <Box>
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
        <Typography sx={{ mb: 3, display: { xs: "block", md: "block" } }}>
          {localUserDetails.goal === "Losing weight" ? (
            <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
              Let us help you achieve your goal by losing
              <span style={{ color: "#A34BCE", fontWeight: "600" }}>
                {""} {localUserDetails.weight - localUserDetails.idealWeight}kg
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
                {""} {localUserDetails.idealWeight - localUserDetails.weight}kg
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
      </Box>
      <hr style={{ opacity: "40%" }} />
      <Typography
        sx={{
          mt: 3,
          fontWeight: "600",
          fontSize: "20px",
        }}
      >
        Today's Meals
      </Typography>

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
            border:'1px solid #A34BCE'
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
            {dailyCalories}
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
            border:'1px solid #A34BCE'
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
            {dailyCarbs}
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
            border:'1px solid #A34BCE'
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
            {dailyFat}
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
            border:'1px solid #A34BCE'
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
            {dailyProtein}
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
      <Box>
        {dailyMeals.length > 0 ? (
          <Stack
            direction={"row"}
            flexWrap={"wrap"}
            justifyContent={{ xs: "center", md: "space-evenly" }}
            sx={{ mt: { xs: 5, sm: 5 }, gap: { xs: 3, md: 3 } }}
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
            <Box
              sx={{
                width: "290px",
                height: "180px",
                borderRadius: "10px",
                display: { xs: "none", sm: "block" },
              }}
            ></Box>
          </Stack>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "450px",
            }}
          >
            <CircularProgress />
          </div>
        )}
      </Box>
      <Box sx={{ mt: 5, ml: 1 }}>
        <Link to="/food-analyzer" style={{ textDecoration: "none" }}>
          <Button
            sx={{
              borderRadius: 5,
              justifyContent: "center",
            }}
            variant="contained"
            startIcon={<CameraAlt sx={{ ml: 1, p: 1 }} />}
          ></Button>
        </Link>
      </Box>

       <div>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Modal
      </Button>


      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Modal Content
          </Typography>


          <FoodAnalyzer />

          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
    </Box>
  );
};

export default DietMeals;
