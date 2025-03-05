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
      <Stack mt={5}>
      <Box mx={'auto'} mt={7} mb={5}>
      <img src={'/results.svg'} alt={'results-dishs'} width={'70%'}/>
      </Box>

      <Box>
        <Typography fontWeight="bold" gutterBottom sx={{mt:{xs:2,sm:5},fontSize: { xs: "24px", sm: "30px" }}}>
        NutriVibe tailors your plan based on your data and goals.
        </Typography>
        <Typography
          color="textSecondary"
          my={2}
          mx={"auto"}
          sx={{
            fontSize: { xs: "16px", },
            width: { xs: "100%", sm: "80%" },
          }}
        >
          Personalized meals and calories, just for you.
        </Typography>
      </Box>
      </Stack>

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
              width: { xs: "60%", sm: "83%", md: "85%", lg: "83%" },
              height: 60,
              fontWeight: "bold",
              textTransform: "none",
              fontSize:{xs:"14px",sm:"18px"},
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
