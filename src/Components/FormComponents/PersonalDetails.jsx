import { useContext, useEffect, useState } from "react";
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
import { Female, KeyboardArrowLeft, Male, Man, Woman } from "@mui/icons-material";
import { MealsContext } from "../../Utils/MealsContext";

const PersonalDetails = () => {
  const { setUserDetails } = useContext(MealsContext);
  const [personalData, setPersonalData] = useState({
    gender: '',
    age: '',
    height: '',
    weight: '',
  });
  const [visibleFields, setVisibleFields] = useState(["gender"]);

  useEffect(() => {
    setUserDetails((prev) => ({ ...prev, ...personalData }));
  }, [personalData]);

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

  return (
    <Stack
      sx={{
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box>
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
                    sx={{ fontSize: "18px", textAlign: "center", mt: 2 }}
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
                                  borderRadius: 2,
                                  textTransform: "none",
                                  px: 3,
                                  py: 1,
                                  fontWeight: "600",
                                  border: "2px solid #A34BCE",
                                  width: { xs: "300px", lg: "300px" },
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1, 
                                }}
                              >
                                {option === "Male" ? <Man /> : <Woman />}
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
                 inputRef={(input) => {
                  if (input) {
                    input.min = 10;
                    input.max = 100;
                  }
                }}
                  fullWidth
                  type="number"
                  value={personalData.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  sx={{
                    mb: 2,
                    backgroundColor: "#FAFCFF",
                    borderRadius: "50px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 5,
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
                      borderRadius: 5,
                      height: { xs: "50px", sm: "60px" },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <Typography sx={{ fontSize: "18px", ml: 1 }}>
                        cm
                      </Typography>
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
                      borderRadius: 5,
                      height: { xs: "50px", sm: "60px" },
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <Typography sx={{ fontSize: "18px", ml: 1 }}>
                        kg
                      </Typography>
                    ),
                  }}
                />
              </>
            )}
          </ThemeProvider>
        </Box>
      </Box>

      <Box>
        <Link to="/custom-diet">
          <IconButton
            size="large"
            sx={{
              bgcolor: "#E7EDf5",
              "&:hover": { bgcolor: "#DEE4EB" },
              width: 60,
              height: 60,
              mb:2
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
                width: { xs: "70%", sm: "83%",md:"85%",lg:'83%' },
                height: 60,
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "18px",
                ml: 3,
                "&:hover": {
                  backgroundColor: "#A34BCE",
                },
                mb:2
              }}
            >
              Next
            </Button>
          </Link>
        )}
      </Box>
    </Stack>
  );
};

export default PersonalDetails;
