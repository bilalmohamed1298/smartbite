import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  ThemeProvider,
  createTheme,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ResultsComponent = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fcf6ff",
        p: 3,
        borderRadius: 4,
        maxWidth: "100%",
        height: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box mx={'auto'} mt={5}>
      <img src={'/results.svg'} alt={'results-dishs'} width={'70%'}/>
      </Box>

      <Box>
        <Typography variant="h4" fontWeight="bold" gutterBottom mt={5}>
        NutriVibe tailors your plan based on your data and goals.
        </Typography>
        <Typography
          fontSize={"18px"}
          width={"400px"}
          color="textSecondary"
          mt={2}
          mx={"auto"}
        >
          Personalized meals and calories, just for you.
        </Typography>
      </Box>

      <Box>
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

        <Link to="/diet-meals">
          <Button
            size="large"
            sx={{
              borderRadius: "50px",
              backgroundColor: "#A34BCE",
              color: "white",
              width: { xs: "70%", sm: "83%", md: "85%", lg: "83%" },
              height: 60,
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "18px",
              ml: 3,
              "&:hover": {
                backgroundColor: "#A34BCE",
              },
            }}
          >
            Show Results
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ResultsComponent;
