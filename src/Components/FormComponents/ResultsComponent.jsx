import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  ThemeProvider,
  createTheme,
  IconButton,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ResultsComponent = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fcf6ff",
        borderRadius: 4,
        height: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stack mt={5}>
        <Box mx={"auto"} mt={7} mb={5}>
          <img src={"/results.svg"} alt={"results-dishs"} width={"70%"} />
        </Box>

        <Box>
          <Typography
            fontWeight="bold"
            gutterBottom
            sx={{ mt: { xs: 2, sm: 5 }, fontSize: { xs: "24px", sm: "30px" } }}
          >
            NutriVibe tailors your plan based on your data and goals.
          </Typography>
          <Typography
            color="textSecondary"
            my={2}
            mx={"auto"}
            sx={{
              fontSize: { xs: "16px" },
              width: { xs: "100%", sm: "80%" },
            }}
          >
            Personalized meals and calories, just for you.
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Box sx={{ width: "auto" }}>
          <Link to="/details">
            <IconButton
              size="large"
              sx={{
                bgcolor: "#E7EDf5",
                "&:hover": { bgcolor: "#DEE4EB" },
                width: 60,
                height: 60,
              }}
            >
              <KeyboardArrowLeft />
            </IconButton>
          </Link>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Link to="/diet-meals">
            <Button
              size="large"
              sx={{
                borderRadius: "50px",
                backgroundColor: "#A34BCE",
                color: "white",
                height: 60,
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "18px",
                "&:hover": {
                  backgroundColor: "#A34BCE",
                },
                width: "100%",
              }}
            >
              Show Results
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ResultsComponent;
