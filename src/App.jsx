import { Container, createTheme, ThemeProvider } from "@mui/material";
import SignupForm from "./Components/SignupForm";
import { MealsContextProvider } from "./Utils/MealsContext";
import Logo from "./Components/Logo";


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

        <Container disableGutters>
          <Logo />
          <SignupForm />
        </Container>

    </MealsContextProvider>
    </ThemeProvider>
  );
}
