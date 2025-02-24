import { Box } from "@mui/material";
import OverallQuestions from "./FormComponents/OverallQuestions";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersonalDetails from "./FormComponents/PersonalDetails";
import Welcome from "./FormComponents/Welcome";

export default function SignupForm() {
  return (
    <Box
      sx={{
        width: { lg: "55%", xs: "90%" },
        height: "813px",
        mx: "auto",
        mt: 5,
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
        <Route path='/' element={<Welcome />} />
        <Route path='/overall' element={<OverallQuestions />} />
        <Route path='/details' element={<PersonalDetails/>} />
      </Routes>
      </BrowserRouter>
    </Box>
  );
}
