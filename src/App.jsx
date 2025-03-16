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
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
          xxl: 1920,
        },
      },
    },
  });
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MealsContextProvider>
          <Container disableGutters>
            <Logo />
            <SignupForm />
          </Container>
        </MealsContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
