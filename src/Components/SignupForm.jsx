import { Box } from "@mui/material";
import OverallQuestions from "./FormComponents/OverallQuestions";
import { Route, Routes } from "react-router-dom";
import PersonalDetails from "./FormComponents/PersonalDetails";
import Welcome from "./FormComponents/Welcome";
import DietMeals from "./FormComponents/DietMeals";
import Preferences from "./FormComponents/Preferences";
import MealDetails from "./FormComponents/MealDetails";
import FoodAnalyzer from "./FormComponents/FoodAnalayzer";
import CustomDietComponent from "./FormComponents/CustomDietComponent";
import ResultsComponent from "./FormComponents/ResultsComponent";

export default function SignupForm() {
  return (
    <Box
    sx={{
      width: { lg: "55%", sm: "90%", xs: "85%" },
      maxHeight: { xs: "100vh"}, 
      height: {xs:"650px",sm:'780px'}, 
      mx: "auto",
      my: { xs: 5, lg: 1 },
      p: 3,
      bgcolor: "white",
      boxShadow: 3,
      borderRadius: 3,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      overflowX: {xs:"hidden"},
      overflowY: {xs:'auto',sm:'auto'}
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
    </Box>
  );
}
