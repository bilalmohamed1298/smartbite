import { Box, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { MealsContext } from "../../Utils/MealsContext";
import { Link } from "react-router-dom";

const DietMeals = () => {
  const { dailyMeals, userDetails } = useContext(MealsContext);
  console.log(userDetails);
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
        <Stack direction={"row"} sx={{ flexWrap: "wrap", gap: {xs:1,md:2}, mb: 5 }}>
          <Box
            sx={{
              boxShadow: 2,
              p: 1,
              width: {xs:'14%',sm:'15%'},
              height: "10%",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Typography sx={{ fontSize: { xs: "13px", sm: "16px" }, ml: {xs:0,sm:1},mb:'5px',textAlign:{xs:'center',sm:'start'} }}>
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
              {" "}
              {userDetails.age}{" "}
              <span style={{ fontSize: "14px", marginLeft: "1px" }}>years</span>
            </Typography>
          </Box>
          <Box
            sx={{
              boxShadow: 2,
              p: 1,
              width: {xs:'14%'},
              height: "10%",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Typography sx={{ fontSize: { xs: "13px", sm: "16px" }, ml: {xs:0,sm:1},mb:'5px',textAlign:{xs:'center',sm:'start'} }}>
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
              {" "}
              {userDetails.height}{" "}
              <span style={{ fontSize: "14px", marginLeft: "5px" }}>cm</span>
            </Typography>
          </Box>
          <Box
            sx={{
              boxShadow: 2,
              p: 1,
              width: {xs:'14%'},
              height: "10%",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Typography sx={{ fontSize: { xs: "13px", sm: "16px" }, ml: {xs:0,sm:1},mb:'5px',textAlign:{xs:'center',sm:'start'} }}>
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
              {" "}
              {userDetails.weight}{" "}
              <span style={{ fontSize: "14px", marginLeft: "5px" }}>kg</span>
            </Typography>
          </Box>
          <Box
            sx={{
              boxShadow: 2,
              p: 1,
              width: {xs:'14%'},
              height: "10%",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Typography sx={{ fontSize: { xs: "13px", sm: "16px" }, ml: {xs:0,sm:1},mb:'5px',textAlign:{xs:'center',sm:'start'} }}>
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
              {" "}
              {userDetails.idealWeight}{" "}
              <span style={{ fontSize: "14px", marginLeft: "5px" }}>kg</span>
            </Typography>
          </Box>
          <Box
            sx={{
              boxShadow: 2,
              p: 1,
              width: {xs:'14%'},
              height: "10%",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Typography sx={{ fontSize: { xs: "13px", sm: "16px" }, ml: {xs:0,sm:1},mb:'5px',textAlign:{xs:'center',sm:'start'} }}>
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
              {" "}
              {userDetails.duration}{" "}
              <span style={{ fontSize: "14px", marginLeft: "5px" }}>days</span>
            </Typography>
          </Box>
        </Stack>
        <Typography sx={{ mb: 3, display:{xs:'none',md:'block'} }}>
          {userDetails.goal === "Losing weight" ? (
            <Typography>
              Let us help you achieve your goal by losing
              <span style={{ color: "#A34BCE", fontWeight: "600" }}>
                {""} {userDetails.weight - userDetails.idealWeight} Kgs
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
                {""} {userDetails.idealWeight - userDetails.weight} Kgs
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
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={{ xs: "center", md: "start" }}
        sx={{ mt: { xs: 3, sm: 3 }, gap: { xs: 3, md: 3 }, mx: 5 }}
      >
        <Link
          to="/meal-details"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Box
            sx={{
              width: { xs: "250px", sm: "260px" },
              height: { xs: "100px", sm: "120px" },
              borderRadius: 5,
              background: "#fdfbfe",
              boxShadow: 1,
              paddingBottom: 5,
              '&:hover':{scale:'1.1'},
              transition:'0.3s ease-in-out'
            }}
          >
            <Box
              sx={{
                height: { xs: "100px", sm: "110px" },
              }}
            >
              <img
                src="/meal.jpg"
                alt=""
                style={{
                  borderRadius: "20px 20px 0px 0px",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>

            <Typography
              sx={{ ml: 2, mt: 1, fontSize: { xs: "16px", sm: "18px" } }}
            >
              Meal Name
            </Typography>
          </Box>
        </Link>

        <Box
          sx={{
            width: { xs: "250px", sm: "260px" },
            height: { xs: "100px", sm: "120px" },
            borderRadius: 5,
            background: "#fdfbfe",
            boxShadow: 1,
            paddingBottom: 5,
          }}
        >
          <Box
            sx={{
              height: { xs: "100px", sm: "110px" },
            }}
          >
            <img
              src="/meal.jpg"
              alt=""
              style={{
                borderRadius: "20px 20px 0px 0px",
                width: "100%",
                height: "100%",
              }}
            />
          </Box>

          <Typography
            sx={{ ml: 2, mt: 1, fontSize: { xs: "16px", sm: "18px" } }}
          >
            Meal Name
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "250px", sm: "260px" },
            height: { xs: "100px", sm: "120px" },
            borderRadius: 5,
            background: "#fdfbfe",
            boxShadow: 1,
            paddingBottom: 5,
          }}
        >
          <Box
            sx={{
              height: { xs: "100px", sm: "110px" },
            }}
          >
            <img
              src="/meal.jpg"
              alt=""
              style={{
                borderRadius: "20px 20px 0px 0px",
                width: "100%",
                height: "100%",
              }}
            />
          </Box>

          <Typography
            sx={{ ml: 2, mt: 1, fontSize: { xs: "16px", sm: "18px" } }}
          >
            Meal Name
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default DietMeals;
