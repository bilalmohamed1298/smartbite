import { Box } from "@mui/material";
import OverallQuestions from "./FormComponents/OverallQuestions";
import { Route, Routes } from "react-router-dom";
import PersonalDetails from "./FormComponents/PersonalDetails";
import Welcome from "./FormComponents/Welcome";
import DietMeals from "./FormComponents/DietMeals";
import Preferences from "./FormComponents/Preferences";

export default function SignupForm() {
  return (
    <Box
      sx={{
        width: { lg: "55%", sm: "90%",xs:'85%' },
        height: { xs: "780px", sm: "780px" },
        mx: "auto",
        my: {xs:4, lg: 1 },
        p: 3,
        bgcolor: "white",
        boxShadow: 3,
        borderRadius: 3,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow:'auto',
        overflowX:"hidden",
        overflowY:'auto'
      }}
    >
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/overall" element={<OverallQuestions />} />
        <Route path="/details" element={<PersonalDetails />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/diet-meals" element={<DietMeals />} />
      </Routes>
    </Box>
  );
}
