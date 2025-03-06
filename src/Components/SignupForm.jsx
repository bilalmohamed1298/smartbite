import { Box, Button, Modal, Typography} from "@mui/material";
import OverallQuestions from "./FormComponents/OverallQuestions";
import {Link, Route, Routes } from "react-router-dom";
import PersonalDetails from "./FormComponents/PersonalDetails";
import Welcome from "./FormComponents/Welcome";
import DietMeals from "./FormComponents/DietMeals";
import Preferences from "./FormComponents/Preferences";
import MealDetails from "./FormComponents/MealDetails";
import FoodAnalyzer from "./FormComponents/FoodAnalayzer";
import CustomDietComponent from "./FormComponents/CustomDietComponent";
import ResultsComponent from "./FormComponents/ResultsComponent";
import { CameraAlt } from "@mui/icons-material";
import { useState } from "react";

export default function SignupForm() {
  const [open1, setOpen1] = useState(false);
  return (
    <Box
      sx={{
        height: {xs:'93vh',lg:'790px'},
        my: { xs: 0,lg:1 },
        p: 3,
        bgcolor: "white",
        boxShadow: {xs:0,sm:3},
        borderRadius: 3,
        position: "relative",
        overflowX: { xs: "hidden" },
        overflowY:{xs:'auto',sm:'hidden'},
      }}
    >


      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/overall" element={<OverallQuestions />} />
        <Route path="/custom-diet" element={<CustomDietComponent />} />
        <Route path="/details" element={<PersonalDetails />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/results" element={<ResultsComponent />} />
        <Route path="/diet-meals" element={<DietMeals />} />
        <Route path="/meal-details/:id" element={<MealDetails />} />
        <Route path="/food-analyzer" element={<FoodAnalyzer />} />
      </Routes>


      <Box
        sx={{
          position: "absolute",
          right: {xs:35,sm:80},
          top: 25,
          width: "70px",
        }}
      >
        <Link style={{ textDecoration: "none" }}>
          <Button
            onClick={() => setOpen1(true)}
            sx={{
              borderRadius: 10,
              justifyContent: "center",
              p: "8px 3px",
            }}
            variant="contained"
            startIcon={<CameraAlt sx={{ ml: "10px" }} />}
          ></Button>
        </Link>
      </Box>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal
          open={open1}
          onClose={() => setOpen1(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          sx={{ overflow: "scroll", mt: 3, borderRadius: 2 }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "75%", sm: 500 },
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 2,
              borderRadius: 2,
              height: "70%",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2" mb={1}>
              Food Analyzer
            </Typography>

            <FoodAnalyzer />
          </Box>
        </Modal>
      </div>

      
    </Box>
  );
}
