import { Box } from "@mui/material";
import OverallQuestions from "./FormComponents/OverallQuestions";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersonalDetails from "./FormComponents/PersonalDetails";
import Welcome from "./FormComponents/Welcome";
import { useContext } from "react";
import { MealsContext } from "../Utils/MealsContext";

export default function SignupForm() {

  const {bla} = useContext(MealsContext)

  return (
    <Box
      sx={{
        width: { lg: "55%", xs: "90%" },
        height: {xs:"780px",lg:'780px'},
        mx: "auto",
        mt: {xs:5,lg:1},
        p: 3,
        bgcolor: "white",
        boxShadow: 3,
        borderRadius: 3,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/overall" element={<OverallQuestions />} />
          <Route path="/details" element={<PersonalDetails />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
