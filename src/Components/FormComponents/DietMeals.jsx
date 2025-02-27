import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { MealsContext } from "../../Utils/MealsContext";
import { Link } from "react-router-dom";
import { CameraAlt } from "@mui/icons-material";

const DietMeals = () => {
  const { dailyMeals, userDetails } = useContext(MealsContext);
  console.log(userDetails);
  console.log(dailyMeals);
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
              {userDetails.age}
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
              {userDetails.height}
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
              {userDetails.weight}
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
              {userDetails.idealWeight}
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
              {userDetails.duration}
              <span style={{ fontSize: "14px", marginLeft: "1px" }}>days</span>
            </Typography>
          </Box>
        </Stack>
        <Typography sx={{ mb: 3, display: { xs: "block", md: "block" } }}>
          {userDetails.goal === "Losing weight" ? (
            <Typography sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
              Let us help you achieve your goal by losing
              <span style={{ color: "#A34BCE", fontWeight: "600" }}>
                {""} {userDetails.weight - userDetails.idealWeight}kg
              </span>{" "}
              within{" "}
              <span style={{ color: "#A34BCE", fontWeight: "600" }}>
                {userDetails.duration} days
              </span>{" "}
              💪🔥
            </Typography>
          ) : userDetails.goal === "Gaining muscle" ? (
            <Typography>
              Let us help you achieve your goal by gaining
              <span style={{ color: "#A34BCE", fontWeight: "600" }}>
                {""} {userDetails.idealWeight - userDetails.weight}kg
              </span>{" "}
              within{" "}
              <span style={{ color: "#A34BCE", fontWeight: "600" }}>
                {userDetails.duration} days
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
                  width:'290px',
                  height: "180px",
                  borderRadius: "10px",
                  display:{xs:'none',sm:'block'}
                }}
              ></Box>
            </Stack>
          ) : (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "450px" }}>
            <CircularProgress />
          </div>
          )}
        </Box>
        <Box sx={{mt:5,ml:1}}>
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
    </Box>
  );
};

export default DietMeals;
