import { useState } from "react";
import {
  Box,
  Button,
  createTheme,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { KeyboardArrowLeft } from "@mui/icons-material";

const PersonalDetails = () => {
  const [personalData, setPersonalData] = useState({
    gender: "",
    age: "",
    height: "",
    weight: "",
  });
  const [visibleFields, setVisibleFields] = useState(["gender"]);

  const handleChange = (field, value) => {
    setPersonalData((prev) => ({ ...prev, [field]: value }));

    if (field === "gender" && !visibleFields.includes("age")) {
      setVisibleFields([...visibleFields, "age"]);
    } else if (field === "age" && !visibleFields.includes("height")) {
      setVisibleFields([...visibleFields, "height"]);
    } else if (field === "height" && !visibleFields.includes("weight")) {
      setVisibleFields([...visibleFields, "weight"]);
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#A34BCE",
      },
    },
  });

  console.log(personalData);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        position: "relative",
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: "12px",
            bgcolor: "#A34BCE",
            color: "#fff",
            width: "100px",
            padding: "5px",
            borderRadius: "5px",
            textAlign: "center",
            fontWeight: "600",
            mb: "12px",
          }}
          gutterBottom
        >
          Personal Details
        </Typography>
        <hr
          style={{
            border: "2px solid #D8BFF2",
            width: "94%",
            marginLeft: "8px",
          }}
        />
      </Box>

      <Box>
        {visibleFields.includes("gender") && (
          <>
            <Stack
              sx={{
                mb: 3,
              }}
            >
              <Box
                sx={{
                  mx: "auto",
                }}
              >
                <Typography
                  sx={{ fontSize: "18px", textAlign: "center", my: 2 }}
                  gutterBottom
                >
                  What is your gender
                </Typography>
                <FormControl component="fieldset" sx={{ mb: 2 }}>
                  <RadioGroup
                    value={personalData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 3,
                      mt: 1,
                    }}
                  >
                    {["Male", "Female"].map((option) => (
                      <FormControlLabel
                        sx={{
                          mx: "auto",
                        }}
                        key={option}
                        value={option}
                        control={<Radio sx={{ display: "none" }} />}
                        label={
                          <ThemeProvider theme={theme}>
                            <Button
                              color="primary"
                              size="large"
                              variant={
                                personalData.gender === option
                                  ? "contained"
                                  : "outlined"
                              }
                              onClick={() => handleChange("gender", option)}
                              sx={{
                                borderRadius: "50px",
                                textTransform: "none",
                                px: 3,
                                py: 1,
                                fontWeight: "600",
                                border: "2px solid #A34BCE",
                                width: { xs: "300px", lg: "300px" },
                              }}
                            >
                              {option}
                            </Button>
                          </ThemeProvider>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Box>
            </Stack>
          </>
        )}

        <ThemeProvider theme={theme}>
          {visibleFields.includes("age") && (
            <>
              <Typography
                sx={{ fontSize: "18px", mb: { sm: 2, xs: 1 } }}
                gutterBottom
              >
                How old are you?
              </Typography>

              <TextField
                fullWidth
                type="number"
                value={personalData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                sx={{
                  mb: 2,
                  backgroundColor: "#FAFCFF",
                  borderRadius: "50px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    height: { xs: "50px", sm: "60px" },
                  },
                }}
              />
            </>
          )}

          {visibleFields.includes("height") && (
            <>
              <Typography
                sx={{ fontSize: "18px", mb: { sm: 2, xs: 1 } }}
                gutterBottom
              >
                What is your height?
              </Typography>
              <TextField
                fullWidth
                type="number"
                value={personalData.height}
                onChange={(e) => handleChange("height", e.target.value)}
                sx={{
                  mb: 2,
                  backgroundColor: "#FAFCFF",
                  borderRadius: "50px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    height: { xs: "50px", sm: "60px" },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <Typography sx={{ fontSize: "18px", ml: 1 }}>cm</Typography>
                  ),
                }}
              />
            </>
          )}

          {visibleFields.includes("weight") && (
            <>
              <Typography
                sx={{ fontSize: "18px", mb: { sm: 2, xs: 1 } }}
                gutterBottom
              >
                What is your current weight?
              </Typography>
              <TextField
                fullWidth
                type="number"
                value={personalData.weight}
                onChange={(e) => handleChange("weight", e.target.value)}
                sx={{
                  mb: 2,
                  backgroundColor: "#FAFCFF",
                  borderRadius: "50px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    height: { xs: "50px", sm: "60px" },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <Typography sx={{ fontSize: "18px", ml: 1 }}>kg</Typography>
                  ),
                }}
              />
            </>
          )}
        </ThemeProvider>
      </Box>

      <Link to="/overall">
        <IconButton
          size="large"
          sx={{
            position: "absolute",
            bottom: 20,
            left: 20,
            bgcolor: "#E7EDf5",
            "&:hover": { bgcolor: "#DEE4EB" },
            width: 65,
            height: 60,
          }}
        >
          <KeyboardArrowLeft />
        </IconButton>
      </Link>

      {visibleFields.includes("weight") && personalData.weight && (
        <Link to="/preferences">
          <Button
            size="large"
            sx={{
              borderRadius: "50px",
              backgroundColor: "#A34BCE",
              color: "white",
              width: { xs: "60%", sm: "80%" },
              height: 60,
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "18px",
              "&:hover": {
                backgroundColor: "#A34BCE",
              },
              position: "absolute",
              bottom: 20,
              right: 20,
            }}
          >
            Next
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default PersonalDetails;
