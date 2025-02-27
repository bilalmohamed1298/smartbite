import { Container } from "@mui/material";
import SignupForm from "./Components/SignupForm";
import { MealsContextProvider } from "./Utils/MealsContext";
import Logo from "./Components/Logo";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <MealsContextProvider>
      <BrowserRouter >
        <Container sx={{maxHeight:'100vh'}}>
          <Logo />
          <SignupForm />
        </Container>
      </BrowserRouter>
    </MealsContextProvider>
  );
}
