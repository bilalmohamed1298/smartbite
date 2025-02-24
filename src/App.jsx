import { Container } from "@mui/material";
import SignupForm from "./Components/SignupForm";
import { MealsContextProvider } from "./Utils/MealsContext";
import Logo from "./Components/Logo";


export default function App() {
  return (
    <MealsContextProvider>
      <Container >
          <Logo/>
          <SignupForm />
      </Container>
      </MealsContextProvider>

  );
}
