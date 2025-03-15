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
import {
  Female,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Male,
  Man,
  Woman,
} from "@mui/icons-material";
import { MealsContext } from "../../Utils/MealsContext";

const PersonalDetails = () => {
  const { setUserDetails,personalData, setPersonalData } = useContext(MealsContext);

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
            المعلومات الشخصية
          </Typography>
          <hr
            style={{
              border: "2px solid #D8BFF2",
              width: "99%",
              marginLeft: "15px",
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
                    ما هو جنسك؟
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
                      {["ذكر", "أنثى"].map((option) => (
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
                                {option === "ذكر" ? <Man /> : <Woman />}
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
                  كم عمرك؟
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
                  ما هو طولك؟
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
                        سم
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
                  ما هو وزنك الحالي؟
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
                        كجم
                      </Typography>
                    ),
                  }}
                />
              </>
            )}
          </ThemeProvider>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexDirection: "row",
          width: "100%",
        }}
      >
        <Box sx={{ width: "auto" }}>
          <Link to="/custom-diet">
            <IconButton
              size="large"
              sx={{
                bgcolor: "#E7EDf5",
                "&:hover": { bgcolor: "#DEE4EB" },
                width: 60,
                height: 60,
              }}
            >
              <KeyboardArrowRight />
            </IconButton>
          </Link>
        </Box>
        <Box sx={{ width: "100%" }}>
          {visibleFields.includes("weight") && personalData.weight && (
            <Link to="/preferences">
              <Button
                size="large"
                sx={{
                  borderRadius: "50px",
                  backgroundColor: "#A34BCE",
                  color: "white",
                  height: 60,
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: "18px",
                  "&:hover": {
                    backgroundColor: "#A34BCE",
                  },
                  width: "100%",
                }}
              >
                التالي
              </Button>
            </Link>
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default PersonalDetails;
