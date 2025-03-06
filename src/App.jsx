import { Container, createTheme, ThemeProvider } from "@mui/material";
import SignupForm from "./Components/SignupForm";
import { MealsContextProvider } from "./Utils/MealsContext";
import Logo from "./Components/Logo";
import { BrowserRouter } from "react-router-dom";

export default function App() {
    const theme = createTheme({
      palette: {
        primary: {
          main: "#A34BCE",
        },
      },
    });
  return (
    <ThemeProvider theme={theme}>
    <MealsContextProvider>
      <BrowserRouter >
        <Container disableGutters>
          <Logo />
          <SignupForm />
        </Container>
      </BrowserRouter>
    </MealsContextProvider>
    </ThemeProvider>
  );
}
