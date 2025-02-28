import {
  Box,
  Button,
  createTheme,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MealDetails = () => {
  const [MealDetails, setMealDetails] = useState({});
  const [nutritionWidget, setNutritionWidget] = useState({});
  const { id } = useParams();

  const getMealDetails = async () => {
    let details = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=e1960c2436914b008fd31c03c84e51b4`
    );
    let widget = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=e1960c2436914b008fd31c03c84e51b4`
    );
    setMealDetails(details.data);
    setNutritionWidget(widget.data);
    console.log(details.data);
    console.log(widget.data);
  };

  useEffect(() => {
    getMealDetails();
  }, [id]);

  ///////////////////////// Summary ////////////////////////////

  const TruncatedHTML = ({ text, limit }) => {
    const truncated =
      text.split(" ").length > limit
        ? text.split(" ").slice(0, limit).join(" ") + "..."
        : text;

    return (
      <Box>
        <Typography
          sx={{
            fontFamily: "arial",
            fontSize: "14px",
            textOverflow: "ellipsis", 
            whiteSpace: "wrap",
            width: "100%" 
          }}
        >
          <p
            style={{
              margin: "5px 0px 5px 0px",
              color: "black",
              textDecoration: "none",
            }}
            dangerouslySetInnerHTML={{ __html: truncated }}
          />
        </Typography>
        <ThemeProvider theme={theme}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              mt: 1,
            }}
          >
            <a
              target="_blank"
              href={MealDetails.sourceUrl}
              style={{ textDecoration: "none", color: "#A34BCE" }}
            >
              More Information
            </a>
          </Button>
        </ThemeProvider>
      </Box>
    );
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
              height: "230px",
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
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

            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                bottom: 10,
                left: 10,
                color: "white",
                fontWeight: "bold",
              }}
            >
              {MealDetails.title}
            </Typography>
          </Box>
          <Stack direction={"row"} sx={{ gap: 1, flexWrap: "wrap", m: 1 }}>
            {nutritionWidget.ingredients.map((ingredient, index) => index < 7?(
              <Box
                key={index}
                sx={{
                  bgcolor: "#A34BCE",
                  color: "#fff",
                  p: "5px",
                  borderRadius: 2,
                  flexGrow: { xs: 1, sm: 0 },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ textTransform: "capitalize" }}
                >
                  {ingredient.name}
                </Typography>
              </Box>
            ):'')}
          </Stack>
          <Stack sx={{}}>
            <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
              Summary
            </Typography>
            <TruncatedHTML text={MealDetails.summary} limit={60} />
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
                Calories
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {nutritionWidget.calories}
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
                Carbs
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {nutritionWidget.carbs}
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
                Fat
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {nutritionWidget.fat}
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
                Protein
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {nutritionWidget.protein}
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
                Percent Carbs
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
                Percent Carbs
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
                Percent Carbs
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
                Weight/Meal
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontSize: { xs: "16px", sm: "18px" },
                  color: "#A34BCE",
                }}
              >
                {nutritionWidget.weightPerServing.amount}g
              </Typography>
            </Box>
          </Stack>
        </Box>
      ) : (
        "Loading"
      )}
    </Box>
  );
};

export default MealDetails;
